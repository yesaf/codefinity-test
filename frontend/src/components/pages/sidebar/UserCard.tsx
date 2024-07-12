import React from "react";
import classnames from "classnames";
import { TUser } from "@/types/user";

type Props = {
  user: TUser;
  isSelected: boolean;
};

export const UserCard: React.FC<Props> = ({ user, isSelected }) => {
  const cardContainerClass = classnames("h-[70px] flex px-3.5 py-[5px] gap-3.5", {
    "bg-[#f8f8f8]": isSelected
  })
  return (
    <div className={cardContainerClass}>
      <div className="relative">
        <img className="size-[60px]" src={user.avatar} />
        {user.isOnline && (
          <div className="absolute rounded-full bg-green size-[15px] -right-[3px] -bottom-[3px]" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-base leading-[18px] font-semibold">{user.name}</span>
        <span className="text-sm leading-[18px] text-txt-light line-clamp-2">{user.description}</span>
      </div>
    </div>
  );
};
