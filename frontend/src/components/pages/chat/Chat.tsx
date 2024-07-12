import { anotherUser, currentUser } from "@/store/user";
import { UserProfile } from "./UserProfile";
import { TMessage } from "@/types/message";

const messages: TMessage[] = [
  {
    text: "Hello world!",
    sender: anotherUser,
    receiver: currentUser,
    createdAt: new Date().toISOString(),
  },
  {
    text: "Hello robot!",
    sender: currentUser,
    receiver: anotherUser,
    createdAt: new Date().toISOString(),
  },
];

export const Chat: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 bg-gray-light">
      <UserProfile user={currentUser} />
      <div className="flex-1 px-2.5 py-5">
        <div className="h-full max-h-full overflow-auto scrollbar"></div>
      </div>
    </div>
  );
};
