import { useEffect, useMemo, useRef } from "react";
import { UserProfile } from "./UserProfile";
import { MessageInput } from "./MessageInput";
import { Message } from "./Message";

import { useUserStore } from "@/store/user";
import { useChatsStore } from "@/store/chats";


export const Chat: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { currentUser } = useUserStore();
  const { selectedChat: chat } = useChatsStore();

  const chatAnotherUser = useMemo(() => {
    if (!chat || !currentUser) {
      return null;
    }
    return chat.users.find((user) => user.id !== currentUser.id)!;
  }, [currentUser, chat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [chat?.messages]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-light">
      <UserProfile user={chatAnotherUser} />
      <div className="flex-1 px-2.5 pt-5 overflow-hidden">
        <div className="flex flex-col h-full max-h-full pb-4 overflow-auto scrollbar">
          {chat?.messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <MessageInput chat={chat} />
    </div>
  );
};
