import React from "react";

export const MessageInput: React.FC = () => {
  return (
    <div className="pt-[14px] pb-5 pl-2.5 pr-[30px] flex gap-2.5">
      <input
        className="flex-1 border rounded-[4px] focus:border-blue-light focus:outline-none px-2.5 py-1.5"
        placeholder="Start chatting!"
      />
      <button className="w-[195px] h-[38px] rounded-[5px] bg-blue border-blue-dark border text-white">
        Send message
      </button>
    </div>
  );
};
