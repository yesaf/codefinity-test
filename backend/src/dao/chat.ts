import { Chat } from "@/models/chat";
import { User } from "@/models/user";
import { UserChat } from "@/models/userChat";
import { Op } from "sequelize";

export class ChatDao {
  constructor() {}

  public static createChat = async (users: string[]) => {
    const chat = await Chat.create();
    await chat.$set("users", users);
    return chat;
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
}