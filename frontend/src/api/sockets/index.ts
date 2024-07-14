import { Socket, io } from 'socket.io-client';
import { TUser } from '@/types/user';

export function connectSocket(currentUser: TUser): Socket {
  const socket = io(import.meta.env.VITE_API_URL as string, {
    query: {
      userId: currentUser.id,
    },
  });

  setupSocketListeners(socket);

  return socket;
}

function setupSocketListeners(socket: Socket) {
  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });
}