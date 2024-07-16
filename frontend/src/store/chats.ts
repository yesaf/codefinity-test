import { create } from "zustand";
import { TChat } from "@/types/chat";
import { TMessage } from "@/types/message";
import { TUser } from "@/types/user";

type TChatsStore = {
  selectedChat: TChat | null;
  chats: TChat[];
  selectChat: (chatId: string) => void;
  setChats: (chats: TChat[]) => void;
  addChats: (chats: TChat[]) => void;
  addMessages: (chatId: string, messages: TMessage[]) => void;
  updateMessages: (chatId: string, mapFunc: (m: TMessage) => TMessage) => void;
  getUserChats: (userId: string) => TChat[];
  updateUsers: (users: TUser[]) => void;
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
    set({
      chats,
    });
  },
  addChats(chats) {
    const mapped: TChat[] = chats
      .filter((chat) => !get().chats.some((c) => c.id === chat.id))
      .map((chat) => ({
        ...chat,
        messages: [],
      }));
    set({
      chats: get().chats.concat(mapped),
    });

    // Select the first chat if no chat is selected
    if (!get().selectedChat && mapped.length > 0) {
      set({
        selectedChat: mapped[0],
      });
    }
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
  },
  updateUsers(users) {
    console.log("Updating users", users);
    const chats = get().chats;
    const updatedChats = chats.map((chat) => {
      const updatedUsers = chat.users.map((user) => {
        const updatedUser = users.find((u) => u.id === user.id);
        if (!updatedUser) {
          return user;
        }

        return updatedUser;
      });

      return {
        ...chat,
        users: updatedUsers,
      };
    });
    set({
      chats: updatedChats,
    });
  },
}));
