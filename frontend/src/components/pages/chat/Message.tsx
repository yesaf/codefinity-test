import React from "react";
import { TMessage } from "@/types/message";

type Props = {
  message: TMessage;
};

export const Message: React.FC<Props> = ({ message }) => {
  return (
    <div className="max-w-[77%] pr-2.5 rounded-md shadow-md flex flex-col relative">
      <div className="flex justify-between px-2 py-3">{message.sender.name}</div>
      <div className="px-2 py-3">{message.text}</div>
      <span>Seen {message.seenAt}</span>
    </div>
  );
};
