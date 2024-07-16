import React from "react";
import { TUser } from "@/types/user";

type Props = {
  user: TUser | null;
};

export const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <div className="w-full h-[170px] flex">
      {user && (
        <>
          <img
            className="size-[170px] flex-shrink-0"
            src={user?.avatar || "none"}
            alt="User avatar"
          />
          <div className="flex-1 h-full py-4 px-11 bg-gray-mid">
            <h3 className="text-xl font-semibold line-clamp-1" title={user?.name}>
              {user?.name}
            </h3>
            <p className="text-sm line-clamp-5" title={user?.description}>
              {user?.description}
            </p>
          </div>
        </>
      )}

      {!user && (
        <div className="flex flex-col justify-center flex-1 h-full py-4 px-11 bg-gray-mid">
          <p className="text-lg font-semibold text-center">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};
