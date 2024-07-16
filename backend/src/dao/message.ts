import { Message } from "@/models/message";
import { User } from "@/models/user";
import { Op, WhereOptions } from "sequelize";

export class MessageDao {
  constructor() {}

  public static createMessage = async (data: Partial<Message>) => {
    const { id } = await Message.create(data);
    const message = await Message.findByPk(id, {
      include: [
        {
          model: User,
          as: "senderInfo",
          attributes: ["id", "name", "avatar", "description", "online"],
        },
      ],
    });
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
          attributes: ["id", "name", "avatar", "description", "online"],
        },
      ],
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
    return messages;
  };

  public static updateMessagesSeen = async (chatId: string, userId: string) => {
    const messages = await Message.update({
      seenAt: new Date(),
    }, {
      where: {
        chat: chatId,
        senderId: {
          [Op.ne]: userId,
        },
        seenAt: null,
      },
      returning: true,
    });
    return messages;
  }
}
