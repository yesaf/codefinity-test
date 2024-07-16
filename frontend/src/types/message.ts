import { TUser } from "@/types/user";

export type TMessage = {
  text: string;
  sender: TUser;
  chat: string;
  createdAt: string;
  seenAt?: string | null;
};
