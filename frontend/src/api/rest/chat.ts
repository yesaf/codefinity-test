import httpClient from "@/api/rest/client";
import { TMessage } from "@/types/message";

export function getChatMessages(chatId: string): Promise<TMessage[]> {
  return httpClient.get(`/chats/${chatId}/messages`).then((res) => res.data);
}