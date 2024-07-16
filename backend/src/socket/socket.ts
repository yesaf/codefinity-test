import { Server, Socket } from "socket.io";
import { ChatDao } from "@/dao/chat";
import { UserDao } from "@/dao/user";
import { SocketClientEvents, SocketServerEvents } from "@/types/socket";
import { IBot, handleBotsReaction } from "@/utils/bots";
import { MessageDao } from "@/dao/message";
import { User } from "@/models/user";

const allSockets: Record<string, Socket> = {};

async function handleConnection(io: Server, socket: Socket, bots: IBot[]) {
  let userId = socket.handshake.query.userId as string;

  // Check if the user exists
  const user: User | null = await UserDao.getUserById(userId).catch((error) => {
    console.error("Error getting user: ", error);
    socket.disconnect();
    return null;
  });
  if (!user) {
    socket.disconnect();
    return;
  }

  allSockets[userId] = socket;

  // Update user status to online
  console.log("User connected: ", userId);
  await UserDao.updateUser(userId, { online: true })
    .then((user) => {
      socket.broadcast.emit(SocketServerEvents.UsersUpdated, [user]);
    })
    .catch((error) => {
      console.error("Error updating user status: ", error);
    });

  // Check if every user has a chat with the current user and create a new chat if not
  // Also, initialize the chat with the bots
  // And join the chat room
  const [users, chats] = await Promise.all([
    UserDao.getAllUsers(),
    ChatDao.getChatsByUserId(userId),
  ]);
  for (const user of users) {
    if (user.id === userId) continue;

    const chat = chats.find((chat) => {
      return !!chat.users.find((u) => u.id === user.id)
    });
    if (!chat) {
      const newChat = await ChatDao.createChat([userId, user.id]);
      const chatBots = bots.filter((bot) => newChat.users.find((u) => u.id === bot.id));
      chatBots.forEach((bot) =>
        bot.initializeChat(newChat.id, (message) =>
          io.to(newChat.id).emit(SocketServerEvents.Message, message),
        ),
      );
      socket.emit(SocketServerEvents.ChatCreated, newChat);
      // Check if the user is online, should join the chat room
      if (
        allSockets[user.id] &&
        allSockets[user.id].connected
      ) {
        const userSocket = allSockets[user.id];
        io.to(userSocket.id).emit(SocketServerEvents.ChatCreated, newChat);
      }
    } else {
      socket.join(chat.id);
    }
  }
}

// Set up the socket server
export const socketServer = (io: Server, bots: IBot[]) => {
  io.on("connection", async (socket: Socket) => {
    let userId = socket.handshake.query.userId as string;

    await handleConnection(io, socket, bots);

    const handleMessage = async (data: any) => {
      const { chatId, text } = data;
      const message = await MessageDao.createMessage({ chat: chatId, senderId: userId, text });
      io.to(chatId).emit(SocketServerEvents.Message, message);
      handleBotsReaction(message, bots, (response) => {
        io.to(chatId).emit(SocketServerEvents.Message, response);
      });
    };

    const handleJoinChat = async (data: any) => {
      const { chatId } = data;
      if (!chatId) return;
      socket.join(chatId);
    };

    const handleTypingStatus = async (data: any) => {
      const { chatId, isTyping } = data;
      socket.to(chatId).emit(SocketServerEvents.TypingStatus, { chatId, userId, isTyping });
    };

    const handleDisconnect = async () => {
      console.log("User disconnected");

      UserDao.updateUser(userId, { online: false })
        .then(async (user) => {
          socket.broadcast.emit(SocketServerEvents.UsersUpdated, [user]);
        })
        .catch((error) => {
          console.error("Error updating user status: ", error);
        });
    };

    socket.on(SocketClientEvents.Message, handleMessage);

    socket.on(SocketClientEvents.JoinChat, handleJoinChat);

    // Update typing status
    socket.on(SocketClientEvents.TypingStatus, handleTypingStatus);

    socket.on(SocketClientEvents.SeenUpdate, async (data: any) => {
      const { chatId } = data;
      await MessageDao.updateMessagesSeen(chatId, userId);
      io.to(chatId).emit(SocketServerEvents.SeenUpdate, { chatId, userId });
    });

    // Disconnect
    socket.on("disconnect", handleDisconnect);
  });
};
