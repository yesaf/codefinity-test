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

  // Check if every user has a chat with the current user
  const [users, chats] = await Promise.all([UserDao.getAllUsers(), ChatDao.getChatsByUserId(userId)]);
  for (const user of users) {
    if (user.id === userId) continue;

    const chat = chats.find((chat) => !!chat.users.find((u) => u.id === user.id));
    if (!chat) {
      const newChat = await ChatDao.createChat([userId, user.id]);
      const chatBots = bots.filter((bot) => newChat.users.find((u) => u.id === bot.id));
      chatBots.forEach((bot) =>
        bot.initializeChat(newChat.id, (message) =>
          io.to(newChat.id).emit(SocketEvents.Message, { from: bot.id, message }),
        ),
      );
    }
  }

  socket.broadcast.emit(SocketEvents.UsersUpdated, users);
}

// Set up the socket server
export const socketServer = (io: Server, bots: IBot[]) => {
  io.on("connection", async (socket: Socket) => {
    let userId = socket.handshake.query.userId as string;

    await handleConnection(io, socket, bots);

    const handleMessage = async (data: any) => {
      const { chatId, text } = data;
      const message = await MessageDao.createMessage({ chat: chatId, sender: userId, text });
      io.to(chatId).emit(SocketEvents.Message, { from: userId, message });
      handleBotsReaction(message, bots, (response) => {
        io.to(chatId).emit(SocketEvents.Message, { from: response.sender, message: response });
      });
    }

    socket.on(SocketEvents.Message, handleMessage);

    // Update typing status
    socket.on(SocketEvents.TypingStart, (data) => {
      const { chatId } = data;
      io.to(chatId).emit(SocketEvents.TypingStart, { from: userId });
    });
    socket.on(SocketEvents.TypingStop, (data) => {
      const { chatId } = data;
      io.to(chatId).emit(SocketEvents.TypingStop, { from: userId });
    });

    // Disconnect
    socket.on(SocketEvents.Disconnect, () => {
      console.log("User disconnected");

      UserDao.updateUser(userId, { online: false })
        .then(async () => {
          socket.broadcast.emit(SocketEvents.UsersUpdated);
        })
        .catch((error) => {
          console.error("Error updating user status: ", error);
        });
    });
  });
};
