import { Message } from "@/models/message";
import { User } from "@/models/user";
import { Op } from "sequelize";

export class MessageDao {
  constructor() {}

  public static sendMessage = async (data: Omit<Message, "id">) => {
    const message = await Message.create(data);
    return message;
  };

  public static getMessagesByChatId = async (chatId: string, offset: number, limit: number) => {
    const messages = await Message.findAll({
      where: {
        chat: chatId,
      },
      include: [
        {
          model: User,
          as: "senderInfo",
          attributes: ["id", "name", "avatar"],
        },
      ],
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
    return messages;
  };
}
