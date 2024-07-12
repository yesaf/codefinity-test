import React from "react";
import { TUser } from "@/types/user";

type Props = {
  user: TUser;
};

export const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <div className="w-full h-[170px] flex">
      <img className="size-[170px]" src={user.avatar} />
      <div className="h-full py-4 px-11 bg-gray-mid">
        <h3 className="text-xl font-semibold ">{user.name}</h3>
        <p className="text-sm line-clamp-5">{user.description}</p>
      </div>
    </div>
  );
};
