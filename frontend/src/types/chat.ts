import { TUser } from "@/types/user";
import { TMessage } from "@/types/message";

export type TChat = {
  id: string;
  users: TUser[];
  messages: TMessage[];
}