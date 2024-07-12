import { Server, Socket } from "socket.io";

// Set up the socket server
export const socketServer = (io: Server) => {
  io.on("connection", (socket: Socket) => {

    let userId = socket.handshake.query.userId as string;
    console.log("User connected: ", userId);

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};