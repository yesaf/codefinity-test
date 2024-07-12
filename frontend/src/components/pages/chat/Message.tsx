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
  const headClassname = classnames("flex justify-between px-2 py-3", {
    "bg-peach-light": isCurrentUserSender,
    "bg-gray-mid": !isCurrentUserSender,
  });

  return (
    <div className="max-w-[77%] pr-2.5 rounded-md shadow-md flex flex-col relative">
      <div className={headClassname}>{message.sender.name}</div>
      <div className="px-2 py-3">{message.text}</div>
      {showSeenTime && (
        <span className="absolute mt-2 top-full text-txt-secondary">Seen {message.seenAt}</span>
      )}
    </div>
  );
};
