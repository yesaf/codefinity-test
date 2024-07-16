import React, { useEffect, useMemo } from "react";
import { TUser } from "@/types/user";
import { TChat } from "@/types/chat";
import { SocketClientEvents, SocketServerEvents } from "@/types/socket";
import { useSocket } from "@/utils/useSocket";

type Props = {
  chat?: TChat | null;
};

export const MessageInput: React.FC<Props> = ({ chat }) => {
  const [message, setMessage] = React.useState("");
  const [usersTyping, setUsersTyping] = React.useState<TUser[]>([]);

  const isSendDisabled = useMemo(() => message.trim() === "", [message]);

  const socket = useSocket();

  function handleTypingStatus(isTyping: boolean) {
    if (!socket || !chat) return;
    socket.emit(SocketClientEvents.TypingStatus, { chatId: chat?.id, isTyping });
  }

  function handleSendMessage() {
    if (!socket || !chat || !message.trim()) return;
    socket.emit(SocketClientEvents.Message, { chatId: chat.id, text: message });
    setMessage("");
  }

  useEffect(() => {
    if (!socket) return;

    const handleTypingStatus = (data: { chatId: string; userId: string; isTyping: boolean }) => {
      if (!chat || chat.id !== data.chatId) return;
      if (data.isTyping) {
        setUsersTyping((prev) => {
          if (prev.some((u) => u.id === data.userId)) {
            return prev;
          }
          return prev.concat(chat.users.find((u) => u.id === data.userId)!);
        });
      } else {
        setUsersTyping((prev) => prev.filter((u) => u.id !== data.userId));
      }
    };

    socket.on(SocketServerEvents.TypingStatus, handleTypingStatus);

    return () => {
      socket.off(SocketServerEvents.TypingStatus, handleTypingStatus);
    };
  }, [socket, chat]);

  return (
    <div className="pt-1 pb-5 pl-2.5 pr-[30px] flex gap-2.5 relative">
      <textarea
        className="flex-1 border rounded-[4px] focus:border-blue-light focus:outline-none px-2.5 py-1.5 h-[38px] resize-none"
        placeholder="Start chatting!"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={() => handleTypingStatus(true)}
        onBlur={() => handleTypingStatus(false)}
        onKeyDown={(e) => {
          // if Enter and not Shift
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <button
        className="w-[140px] md:w-[195px] h-[38px] rounded-[5px] bg-blue border-blue-dark border text-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSendDisabled}
        onClick={handleSendMessage}
      >
        Send message
      </button>

      {usersTyping.length === 1 && (
        <span className="absolute mb-2 text-sm -translate-x-1/2 bottom-full left-1/2 text-blue-text">
          {usersTyping[0]?.name} is typing...
        </span>
      )}
    </div>
  );
};
