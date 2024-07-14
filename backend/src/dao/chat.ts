import { Chat } from "@/models/chat";
import { User } from "@/models/user";
import { UserChat } from "@/models/userChat";
import { Op } from "sequelize";

export class ChatDao {
  constructor() {}

  public static createChat = async (users: string[]) => {
    const chat = await Chat.create();
    await chat.addUsers(users);

    return this.getChatById(chat.id);
  }

  public static getChatById = async (id: string) => {
    const chat = await Chat.findByPk(id, {
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name", "avatar"],
        },
      ],
    });
    return chat;
  }

  public static getChatsByUserId = async (userId: string) => {
    const chats = await Chat.findAll({
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name", "avatar"],
          through: {
            where: {
              userId,
            },
            attributes: [],
          },
        },
      ],
    });
    return chats;
  }
}