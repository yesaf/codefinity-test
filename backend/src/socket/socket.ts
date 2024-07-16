import { Server, Socket } from "socket.io";
import { ChatDao } from "@/dao/chat";
import { UserDao } from "@/dao/user";
import { SocketEvents } from "@/types/socket";
import { IBot, handleBotsReaction } from "@/utils/bots";
import { MessageDao } from "@/dao/message";

async function handleConnection(io: Server, socket: Socket, bots: IBot[]) {
  let userId = socket.handshake.query.userId as string;

  // Check if the user exists
  UserDao.getUserById(userId)
    .then((user) => {
      if (!user) {
        socket.disconnect();
      }
    })
    .catch((error) => {
      console.error("Error getting user: ", error);
      socket.disconnect();
    });

  // Update user status to online
  console.log("User connected: ", userId);
  await UserDao.updateUser(userId, { online: true })
    .then(([, users]) => {
      socket.broadcast.emit(SocketEvents.UsersUpdated, users);
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

    const chat = chats.find((chat) => !!chat.users.find((u) => u.id === user.id));
    if (!chat) {
      const newChat = await ChatDao.createChat([userId, user.id]);
      const chatBots = bots.filter((bot) => newChat.users.find((u) => u.id === bot.id));
      chatBots.forEach((bot) =>
        bot.initializeChat(newChat.id, (message) =>
          io.to(newChat.id).emit(SocketEvents.Message, message),
        ),
      );
      socket.join(newChat.id);
      // Check if the user is online and join the chat room
      if (user.online) {
        io.to(user.id).emit(SocketEvents.ChatCreated, newChat);
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
      const message = await MessageDao.createMessage({ chat: chatId, sender: userId, text });
      io.to(chatId).emit(SocketEvents.Message, message);
      handleBotsReaction(message, bots, (response) => {
        io.to(chatId).emit(SocketEvents.Message, response);
      });
    };

    const handleJoinChat = async (data: any) => {
      const { chatId } = data;
      if (!chatId) return;
      socket.join(chatId);
    };

    const handleTypingStatus = async (data: any) => {
      const { chatId, typing } = data;
      io.to(chatId).emit(SocketEvents.TypingStatus, { user: userId, typing });
    };

    const handleDisconnect = async () => {
      console.log("User disconnected");

      UserDao.updateUser(userId, { online: false })
        .then(async ([, users]) => {
          socket.broadcast.emit(SocketEvents.UsersUpdated, users);
        })
        .catch((error) => {
          console.error("Error updating user status: ", error);
        });
    };

    socket.on(SocketEvents.Message, handleMessage);

    socket.on(SocketEvents.JoinChat, handleJoinChat);

    // Update typing status
    socket.on(SocketEvents.TypingStatus, handleTypingStatus);

    // Disconnect
    socket.on(SocketEvents.Disconnect, handleDisconnect);
  });
};
