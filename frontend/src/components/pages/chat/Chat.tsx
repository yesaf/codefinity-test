import { useMemo } from "react";
import { UserProfile } from "./UserProfile";
import { MessageInput } from "./MessageInput";
import { Message } from "./Message";

import { useUserStore } from "@/store/user";

import { TChat } from "@/types/chat";

type Props = {
  chat: TChat | null;
}

export const Chat: React.FC<Props> = ({ chat }) => {
  const { currentUser } = useUserStore();

  const chatAnotherUser = useMemo(() => {
    if (!chat || !currentUser) {
      return null;
    }
    return chat.users.find((user) => user.id !== currentUser.id)!;
  }, [currentUser, chat]);

  console.log(chat);

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-light">
      <UserProfile user={chatAnotherUser} />
      <div className="flex-1 px-2.5 pt-5 overflow-hidden">
        <div className="flex flex-col h-full max-h-full overflow-auto scrollbar">
          {chat?.messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>
      </div>
      <MessageInput />
    </div>
  );
};
