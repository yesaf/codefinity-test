import { useEffect, useRef } from "react";

import { Chat } from "@/components/pages/chat/Chat";
import { Sidebar } from "@/components/pages/sidebar/Sidebar";
import { ChatSocketProvider } from "@/components/pages/chat/ChatSocketProvider";
import { Loader } from "@/components/shared/Loader";

import * as UserClient from "@/api/rest/users";

import { useUserStore } from "@/store/user";
import { useChatsStore } from "@/store/chats";

import { TRandomUserData, TUser } from "@/types/user";

async function createNewUser(userData: TRandomUserData, description?: string) {
  const user = await UserClient.createUser({
    name: `${userData.results[0].name.first} ${userData.results[0].name.last}`,
    avatar: userData.results[0].picture.large,
    description,
    online: true,
  });
  localStorage.setItem("currentUserId", user.id);

  return user;
}

async function initializeUser(callback: (user: TUser) => void) {
  const currentUserId = localStorage.getItem("currentUserId");

  if (!currentUserId) {
    const newUserData = await UserClient.getRandomUser();
    const description = await UserClient.getLoremIpsum();
    const user = await createNewUser(newUserData, description);
    callback(user);
    return;
  }

  try {
    const user = await UserClient.getUser(currentUserId);
    if (user?.id) {
      callback(user);
    }
  } catch (error) {
    localStorage.removeItem("currentUserId");
    const newUserData = await UserClient.getRandomUser();
    const description = await UserClient.getLoremIpsum();
    const user = await createNewUser(newUserData, description);
    callback(user);
  }
}

function App() {
  const initialized = useRef(false);
  const { currentUser, updateCurrentUser } = useUserStore();
  const { setChats, selectChat, addMessages } = useChatsStore();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    initializeUser(updateCurrentUser);
  }, [updateCurrentUser]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    UserClient.getUserChats(currentUser.id).then((chats) => {
      setChats(chats);
      if (chats.length > 0) {
        selectChat(chats[0].id);
      }
    });
  }, [currentUser, setChats, selectChat, addMessages]);

  return (
    <ChatSocketProvider>
      {currentUser && (
        <div className="flex flex-col h-full max-h-full overflow-hidden">
          <header className="pt-[13px]">
            <div className="mx-auto max-w-desktop">
              <h1>Chat bots 2.0</h1>
            </div>
          </header>
          <div className="flex-1 pt-5 pb-12 overflow-hidden bg-gray-bg">
            <div className="relative flex mx-auto border size-full max-w-desktop border-divider">
              <Chat />
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      {!currentUser && (
        <div className="flex items-center justify-center h-screen bg-gray-bg">
          <Loader />
        </div>
      )}
    </ChatSocketProvider>
  );
}

export default App;
