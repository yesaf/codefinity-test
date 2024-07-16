import { useContext } from "react";
import { Socket } from "socket.io-client";
import { ChatSocketContext } from "@/components/pages/chat/ChatSocketProvider";

export function useSocket(): Socket | null {
  return useContext(ChatSocketContext);
}