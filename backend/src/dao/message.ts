import { Message } from "@/models/message";
import { User } from "@/models/user";
import { Op } from "sequelize";

export class MessageDao {
  constructor() {}

  public static createMessage = async (data: Partial<Message>) => {
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
          attributes: ["id", "name", "avatar", "description"],
        },
      ],
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
    return messages;
  };

  public static updateMessages = async (chatId: string, userId: string, data: Partial<Message>) => {
    const messages = await Message.update(data, {
      where: {
        chat: chatId,
        sender: {
          [Op.ne]: userId,
        },
      },
      returning: true,
    });
    return messages;
  }
}
