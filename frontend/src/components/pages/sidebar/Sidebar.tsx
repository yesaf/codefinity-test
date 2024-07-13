import React, { useState } from "react";
import classnames from "classnames";
import { anotherUser, currentUser } from "@/store/user";
import { UserCard } from "./UserCard";

enum Tab {
  Online = "online",
  All = "all",
}

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState(Tab.All);
  const [searchText, setSearchText] = useState("");

  const onlineBtnClass = classnames("flex-[0.5] border-b border-transparent text", {
    "border-r border-divider bg-[#f8f8f8] text-[#777777]": activeTab !== Tab.Online,
    "text-[#555555]": activeTab === Tab.Online,
  });
  const allBtnClass = classnames("flex-[0.5] border-b border-transparent", {
    "border-l border-divider bg-[#f8f8f8] text-[#777777]": activeTab !== Tab.All,
    "text-[#555555]": activeTab === Tab.All,
  });

  return (
    <div className="w-[260px] bg-white flex flex-col">
      <div className="flex text-sm h-[42px] flex-shrink-0">
        <button className={onlineBtnClass} onClick={() => setActiveTab(Tab.Online)}>
          Online
        </button>
        <button className={allBtnClass} onClick={() => setActiveTab(Tab.All)}>
          All
        </button>
      </div>
      <div className="flex flex-col mt-2.5 flex-1 overflow-auto scrollbar">
        {[
          currentUser,
          anotherUser,
        ].map((user) => (
          <UserCard user={user} isSelected={user.id === currentUser.id} />
        ))}
      </div>
      <div className="px-3.5 py-5">
        <input
          className="py-1.5 px-3 border border-[#cccccc] w-full rounded-[4px] focus:outline-none placeholder:text-[#999999]"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};
