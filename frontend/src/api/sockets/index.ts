import { Socket, io } from "socket.io-client";
import { TUser } from "@/types/user";
import { useChatsStore } from "@/store/chats";
import { TMessage } from "@/types/message";
import { SocketClientEvents, SocketServerEvents } from "@/types/socket";

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
  const { addChats, addMessages, updateMessages } = useChatsStore.getState();

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });

  socket.on(SocketServerEvents.ChatCreated, (chat) => {
    console.log("Chat created: ", chat);
    addChats([chat]);
    socket.emit(SocketClientEvents.JoinChat, { chatId: chat.id });
  });

  socket.on(SocketServerEvents.Message, (message: TMessage) => {
    addMessages(message.chat, [message]);
  });

  socket.on(SocketServerEvents.SeenUpdate, (data) => {
    const { chatId, userId } = data;

    updateMessages(chatId, (message) => {
      if (message.sender === userId) {
        return {
          ...message,
          seenAt: new Date().toISOString(),
        };
      }

      return message;
    });
  });
}
