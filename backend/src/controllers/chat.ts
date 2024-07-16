import { NextFunction, Request, Response } from "express";
import { MessageDao } from "@/dao/message";

export class ChatController {
  constructor() {}

  public getChatMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, offset } = req.query;

      const chat = await MessageDao.getMessagesByChatId(
        req.params.id,
        offset && Number(offset),
        limit && Number(limit),
      );
      return res.status(200).send(chat);
    } catch (error) {
      console.log("Error in getChatMessages: ", (error as Error)?.message);
      next(error);
    }
  };
}
