import { useEffect, useRef } from "react";
import { Chat } from "@/components/pages/chat/Chat";
import { Sidebar } from "@/components/pages/sidebar/Sidebar";

import * as UserClient from "@/api/rest/users";

import { useUserStore } from "@/store/user";

import { TRandomUserData, TUser } from "@/types/user";
import { ChatSocketProvider } from "./components/pages/chat/ChatSocketProvider";
import { useChatsStore } from "./store/chats";

async function createNewUser(userData: TRandomUserData) {
  const user = await UserClient.createUser({
    name: `${userData.results[0].name.first} ${userData.results[0].name.last}`,
    avatar: userData.results[0].picture.large,
  });
  localStorage.setItem("currentUserId", user.id);

  return user;
}

async function initializeUser(callback: (user: TUser) => void) {
  const currentUserId = localStorage.getItem("currentUserId");

  if (!currentUserId) {
    const newUserData = await UserClient.getRandomUser();
    console.log(newUserData.results[0]);
    const user = await createNewUser(newUserData);
    callback(user);
    return;
  }

  try {
    const user = await UserClient.getUser(currentUserId);
    if (user?.id) {
      callback(user);
    }
  } catch (error) {
    const newUserData = await UserClient.getRandomUser();
    console.log(newUserData.results[0]);
    const user = await createNewUser(newUserData);
    callback(user);
  }
}

function App() {
  const initialized = useRef(false);
  const { currentUser, updateCurrentUser } = useUserStore();
  const { selectedChat } = useChatsStore();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    initializeUser(updateCurrentUser);
  }, [updateCurrentUser]);

  console.log(currentUser && { ...currentUser });

  return (
    <ChatSocketProvider>
      <div className="flex flex-col h-full max-h-full overflow-hidden">
        <header className="pt-[13px]">
          <div className="mx-auto max-w-desktop">
            <h1>Chat bots 2.0</h1>
          </div>
        </header>
        <div className="flex-1 pt-5 pb-12 overflow-hidden bg-gray-bg">
          <div className="flex mx-auto border size-full max-w-desktop border-divider">
            <Chat chat={selectedChat} />
            <Sidebar />
          </div>
        </div>
      </div>
    </ChatSocketProvider>
  );
}

export default App;
