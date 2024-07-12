import { TUser } from "./user";

export type TMessage = {
  text: string;
  sender: TUser;
  receiver: TUser;
  createdAt: string;
  seenAt?: string | null;
};
