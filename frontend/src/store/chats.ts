import { create } from "zustand";
import { TChat } from "@/types/chat";
import { TMessage } from "@/types/message";

export type TChatData = TChat & {
  messages: TMessage[];
};

type TChatsStore = {
  selectedChat: TChatData | null;
  chats: TChatData[];
  selectChat: (chatId: string) => void;
  setChats: (chats: TChat[]) => void;
  addChats: (chats: TChat[]) => void;
  addMessages: (chatId: string, messages: TMessage[]) => void;
  updateMessages: (chatId: string, mapFunc: (m: TMessage) => TMessage) => void;
  getUserChats: (userId: string) => TChatData[];
};

export const useChatsStore = create<TChatsStore>((set, get) => ({
  selectedChat: null,
  chats: [],
  selectChat(chatId) {
    const chat = get().chats.find((c) => c.id === chatId);
    if (!chat) {
      return;
    }
    set({
      selectedChat: chat,
    });
  },
  setChats(chats) {
    const mapped: TChatData[] = chats.map((chat) => ({
      ...chat,
      messages: [],
    }));
    set({
      chats: mapped,
    });
  },
  addChats(chats) {
    const mapped: TChatData[] = chats
      .filter((chat) => !get().chats.some((c) => c.id === chat.id))
      .map((chat) => ({
        ...chat,
        messages: [],
      }));
    set({
      chats: get().chats.concat(mapped),
    });
  },
  addMessages(chatId, messages) {
    const chats = get().chats;
    const updatedChats = chats.map((chat) => {
      if (chat.id !== chatId) {
        return chat;
      }

      return {
        ...chat,
        messages: chat.messages.concat(messages),
      };
    });
    set({
      chats: updatedChats,
    });
  },
  updateMessages(chatId, mapFunc) {
    const chats = get().chats;
    const updatedChats = chats.map((chat) => {
      if (chat.id !== chatId) {
        return chat;
      }

      return {
        ...chat,
        messages: chat.messages.map(mapFunc),
      };
    });
    set({
      chats: updatedChats,
    });
  },
  getUserChats(userId) {
    return get().chats.filter((chat) => chat.users.find((user) => user.id === userId));
  }
}));
