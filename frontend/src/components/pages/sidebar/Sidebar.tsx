import React, { useMemo, useState } from "react";
import classnames from "classnames";

import { UserCard } from "./UserCard";

import { useChatsStore } from "@/store/chats";
import { useUserStore } from "@/store/user";

import { TUser } from "@/types/user";


enum Tab {
  Online = "online",
  All = "all",
}

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState(Tab.All);
  const [searchText, setSearchText] = useState("");

  const { currentUser } = useUserStore();
  const { chats, selectedChat, selectChat } = useChatsStore();

  // Support only 2-user chats for now
  const users = useMemo(() => {
    return chats.reduce((acc, chat) => {
      const anotherUser = chat.users.find((user) => user.id !== currentUser?.id)!;
      acc.push({ user: anotherUser, chatId: chat.id });
      return acc;
    }, [] as { user: TUser; chatId: string }[]);
  }, [chats, currentUser]);

  const filteredUsers = useMemo(() => {
    return users
      .filter(({ user }) => user.name.toLowerCase().includes(searchText.toLowerCase()))
      .filter(({ user }) => {
        return activeTab === Tab.All || user.online
      });
  }, [users, searchText, activeTab]);

  const onlineBtnClass = classnames("flex-[0.5] border-b border-transparent text", {
    "border-r border-divider bg-[#f8f8f8] text-[#777777]": activeTab !== Tab.Online,
    "text-[#555555]": activeTab === Tab.Online,
  });
  const allBtnClass = classnames("flex-[0.5] border-b border-transparent", {
    "border-l border-divider bg-[#f8f8f8] text-[#777777]": activeTab !== Tab.All,
    "text-[#555555]": activeTab === Tab.All,
  });

  return (
    <div className="w-[260px] bg-white flex flex-col">
      <div className="flex text-sm h-[42px] flex-shrink-0">
        <button className={onlineBtnClass} onClick={() => setActiveTab(Tab.Online)}>
          Online
        </button>
        <button className={allBtnClass} onClick={() => setActiveTab(Tab.All)}>
          All
        </button>
      </div>
      <div className="flex flex-col mt-2.5 flex-1 overflow-auto scrollbar">
        {filteredUsers.map(({ user, chatId }) => (
          <UserCard
            key={user.id}
            user={user}
            isSelected={chatId === selectedChat?.id}
            onClick={() => selectChat(chatId)}
          />
        ))}
      </div>
      <div className="px-3.5 py-5">
        <input
          className="py-1.5 px-3 border border-[#cccccc] w-full rounded-[4px] focus:outline-none placeholder:text-[#999999]"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};
