import React from "react";
import classnames from "classnames";
import { TMessage } from "@/types/message";
import { useUserStore } from "@/store/user";
import { prettifyDate } from "@/utils/date";

type Props = {
  message: TMessage;
  showSeenTime?: boolean;
};

export const Message: React.FC<Props> = ({ message, showSeenTime }) => {
  const { currentUser } = useUserStore();

  const isCurrentUserSender = currentUser?.id === message.senderId;
  const containerClass = classnames("w-[72%] shadow-lg flex flex-col relative mb-4 flex-shrink-0 rounded-lg", {
    "mr-5 ml-auto": isCurrentUserSender,
    "ml-5 mr-auto": !isCurrentUserSender,
  });
  const headClass = classnames(
    "flex justify-between py-2.5 px-4 text-sm font-medium rounded-t-lg line-clamp-1",
    {
      "bg-peach-light text-peach-text": isCurrentUserSender,
      "bg-gray-mid text-gray-text": !isCurrentUserSender,
    },
  );

  return (
    <div className={containerClass}>
      <div className={headClass} title={message.senderInfo?.name}>
        <span>{message.senderInfo?.name}</span>
        <span className="opacity-20">{prettifyDate(message.createdAt)}</span>
      </div>
      <div className="py-2.5 px-4 bg-white rounded-b-lg min-h-[44px]">{message.text}</div>
      <div
        className={
          isCurrentUserSender
            ? "message-tail-right bottom-2.5 border-l-white"
            : "message-tail-left bottom-2.5 border-r-white"
        }
      />
      {showSeenTime && message.seenAt && (
        <span className="absolute mt-2 ml-4 text-xs top-full text-txt-secondary">Seen {prettifyDate(message.seenAt)}</span>
      )}
    </div>
  );
};
