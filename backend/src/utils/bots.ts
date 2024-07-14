import { UserDao } from "@/dao/user";
import { MessageDao } from "@/dao/message";
import { ChatDao } from "@/dao/chat";

import { Message } from "@/models/message";

export interface IBot {
  id: string;
  name: string;
  description: string;
  image: string;

  initializeChat(chatId: string, sendMessageCallback: (message: Message) => void): void;
  respond(message: Message): Promise<Message | null>;
}

class Bot implements IBot {
  id: string;
  name: string;
  description: string;
  image: string;

  constructor(name: string, description: string, image: string) {
    this.name = name;
    this.description = description;
    this.image = image;
    UserDao.createUser({
      name: this.name,
      avatar: this.image,
      description: this.description,
      online: true,
    }).then((user) => {
      this.id = user.id;
    }).catch((error) => {
      console.error("Error creating bot user: ", error);
    });
  }

  initializeChat(chatId: string, sendMessageCallback: (m:Message) => void) {}

  async respond(message: Message): Promise<Message | null> {
    return null;
  }
}

export class EchoBot extends Bot {
  constructor() {
    super(
      "Echo Bot",
      "Repeats everything you say",
      "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Tiger",
    );
  }

  async respond(message: Message) {
    return await MessageDao.createMessage({
      chat: message.chat,
      sender: this.id,
      text: message.text,
    });
  }
}

export class ReverseBot extends Bot {
  constructor() {
    super(
      "Reverse Bot",
      "Reverses everything you say",
      "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Lola",
    );
  }

  async respond(message: Message) {
    const text = message.text.split("").reverse().join("");

    return await MessageDao.createMessage({
      chat: message.chat,
      sender: this.id,
      text,
    });
  }
}

function setRandomInterval(callback: () => void | Promise<void>, min: number, max: number) {
  const timeout = Math.floor(Math.random() * (max - min) + min);
  console.log("Next message in: ", timeout);
  setTimeout(async () => {
    await callback();
    setRandomInterval(callback, min, max);
  }, timeout);
}

export class SpamBot extends Bot {
  constructor() {
    super(
      "Spam Bot",
      "As soon as you login for the first time, this bot will send you a message every 10-120 seconds",
      "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Spam",
    );
  }

  initializeChat(chatId: string, sendMessageCallback: (message: Message) => void) {
    setRandomInterval(async () => {
      const message = await MessageDao.createMessage({
        chat: chatId,
        sender: this.id,
        text: "Spam!",
      });
      sendMessageCallback(message);
    }, 10000, 120000);
  }
}

export class IgnoreBot extends Bot {
  constructor() {
    super(
      "Ignore Bot",
      "Ignores everything you say",
      "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Ignore",
    );
  }
}

export function initializeBots() {
  return [
    new EchoBot(),
    new ReverseBot(),
    new SpamBot(),
    new IgnoreBot(),
  ];
}

export async function handleBotsReaction(message: Message, bots: IBot[], callback: (message: Message) => void) {
  const chatId = message.chat;
  const chat = await ChatDao.getChatById(chatId);
  if (!chat) return;
  chat.users.forEach((user) => {
    const bot = bots.find((b) => b.id === user.id);
    if (!bot) return;
    bot.respond(message).then((response) => {
      if (response) {
        callback(response);
      }
    });
  });
}