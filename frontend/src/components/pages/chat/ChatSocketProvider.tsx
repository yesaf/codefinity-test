import { connectSocket } from "@/api/sockets";
import { useUserStore } from "@/store/user";
import React, { Context, createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  children: React.ReactNode;
};

export const ChatSocketContext: Context<Socket | null> = createContext<Socket | null>(null);

export const ChatSocketProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser) return;
    setSocket(connectSocket(currentUser));

    return () => {
      socket?.disconnect();
    };
  }, [currentUser]);

  return (
    <ChatSocketContext.Provider value={socket}>
      {children}
    </ChatSocketContext.Provider>
  );
};
