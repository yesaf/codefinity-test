import { TUser } from "@/types/user";

export type TMessage = {
  text: string;
  senderId: string;
  senderInfo: TUser;
  chat: string;
  createdAt: string;
  seenAt?: string | null;
};
