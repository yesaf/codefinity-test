import { anotherUser, currentUser } from "@/store/user";
import { UserProfile } from "./UserProfile";
import { TMessage } from "@/types/message";
import { MessageInput } from "./MessageInput";
import { Message } from "./Message";

const messages1: TMessage[] = [
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
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec congue dui. Sed blandit vulputate tristique. Vestibulum a luctus ipsum, ac ultrices erat. Sed consequat libero nec augue venenatis blandit. Donec et diam urna. Sed sit amet mi et erat malesuada tempor quis ut nibh. Sed rhoncus iaculis nunc eget congue. Etiam maximus sit amet nulla sit amet mollis. Sed massa orci, volutpat quis metus ac, sodales eleifend est. Nullam sagittis ante quis risus convallis imperdiet. Curabitur ut scelerisque metus, id pharetra felis. Fusce lobortis in augue quis consequat. Maecenas pulvinar porta porttitor.",
    sender: currentUser,
    receiver: anotherUser,
    createdAt: new Date().toISOString(),
  },
];
const messages = [...messages1, ...messages1, ...messages1, ...messages1];

export const Chat: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-light">
      <UserProfile user={currentUser} />
      <div className="flex-1 px-2.5 pt-5 overflow-hidden">
        <div className="flex flex-col h-full max-h-full overflow-auto scrollbar">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>
      </div>
      <MessageInput />
    </div>
  );
};
