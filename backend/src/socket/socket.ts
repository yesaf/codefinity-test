import { UserDao } from "@/dao/user";
import { Server, Socket } from "socket.io";

export enum SocketEvents {
  Disconnect = "disconnect",
  UsersUpdate = "users-update",
  Message = "message",
}

// Set up the socket server
export const socketServer = (io: Server) => {
  io.on("connection", (socket: Socket) => {

    let userId = socket.handshake.query.userId as string;
    console.log("User connected: ", userId);
    UserDao.updateUser(userId, { online: true })
      .then(async () => {
        const users = await UserDao.getUsersExceptId(userId);
        socket.broadcast.emit(SocketEvents.UsersUpdate, users);
      })
      .catch((error) => {
        console.error("Error updating user status: ", error);
      });

    // Create chats with other users
    socket.on(SocketEvents.Message, async (data) => {
      const { to, message } = data;
      io.to(to).emit(SocketEvents.Message, { from: userId, message });
    });
    

    socket.on(SocketEvents.Disconnect, () => {
      console.log("User disconnected");

      UserDao.updateUser(userId, { online: false })
        .then(async () => {
          const users = await UserDao.getUsersExceptId(userId);
          socket.broadcast.emit(SocketEvents.UsersUpdate, users);
        })
        .catch((error) => {
          console.error("Error updating user status: ", error);
        });

    });
  });
};