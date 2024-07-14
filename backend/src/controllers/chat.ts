import { NextFunction, Request, Response } from "express";
import { MessageDao } from "@/dao/message";

export class ChatController {
  constructor() {}

  public getChatMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, offset } = req.query;

      const chat = await MessageDao.getMessagesByChatId(
        req.params.id,
        Number(offset),
        Number(limit),
      );
      return res.status(200).send(chat);
    } catch (error) {
      next(error);
    }
  };
}
