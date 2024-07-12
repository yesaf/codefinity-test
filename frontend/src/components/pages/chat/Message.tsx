import React from "react";
import classnames from "classnames";
import { TMessage } from "@/types/message";
import { currentUser } from "@/store/user";

type Props = {
  message: TMessage;
  showSeenTime?: boolean;
};

export const Message: React.FC<Props> = ({ message, showSeenTime }) => {
  const isCurrentUserSender = currentUser.id === message.sender.id;
  const containerClassName = classnames(
    "w-[72%] shadow-md flex flex-col relative mb-4 flex-shrink-0",
    {
      "mr-5 ml-auto": isCurrentUserSender,
      "ml-5 mr-auto": !isCurrentUserSender,
    },
  );
  const headClassName = classnames("flex justify-between py-2.5 px-4 text-sm font-medium rounded-t-lg", {
    "bg-peach-light text-peach-text": isCurrentUserSender,
    "bg-gray-mid text-gray-text": !isCurrentUserSender,
  });

  return (
    <div className={containerClassName}>
      <div className={headClassName}>{message.sender.name}</div>
      <div className="py-2.5 px-4 bg-white rounded-b-lg">{message.text}</div>
      <div className={
        isCurrentUserSender
        ? "message-tail-right bottom-2.5 border-l-white"
        : "message-tail-left bottom-2.5 border-r-white"
      } />
      {showSeenTime && (
        <span className="absolute mt-2 top-full text-txt-secondary">Seen {message.seenAt}</span>
      )}
    </div>
  );
};
