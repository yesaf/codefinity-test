import { Chat } from "@/models/chat";
import { Message } from "@/models/message";
import { User } from "@/models/user";
import { UserChat } from "@/models/userChat";
import { Op } from "sequelize";

export class ChatDao {
  constructor() {}

  public static createChat = async (users: string[]) => {
    const chat = await Chat.create();
    await chat.addUsers(users);
    console.log("Chat created for users: ", users);

    return this.getChatById(chat.id);
  };

  public static getChatById = async (id: string) => {
    const chat = await Chat.findByPk(id, {
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name", "avatar", "description", "online"],
        },
      ],
    });
    return chat;
  };

  public static getChatsByUserId = async (userId: string) => {
    // Should also include all the users of chat

    const userChats = await UserChat.findAll({
      where: {
        userId: userId,
      },
      attributes: ["chatId"],
    });
    const chats = await Chat.findAll({
      where: {
        id: {
          [Op.in]: userChats.map((uc) => uc.chatId),
        },
      },
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name", "avatar", "description", "online"],
        },
        {
          model: Message,
          as: "messages",
          include: [
            {
              model: User,
              as: "senderInfo",
              attributes: ["id", "name", "avatar", "description", "online"],
            },
          ],
        }
      ],
    });
    return chats;
  };
}
