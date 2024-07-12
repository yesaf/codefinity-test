import { unauthorized } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { UserDao } from "@/dao/user";

export class UserController {
  constructor() {}

  public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserDao.getAllUsers();
      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserDao.createUser({
        ...req.body,
        online: false,
      });
      return res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserDao.getUserById(req.params.id);
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public getUsersExceptId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserDao.getUsersExceptId(req.params.id);
      return res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  };

}
