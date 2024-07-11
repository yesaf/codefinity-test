import { UserController } from "@/controllers/user";
import { Router } from "express";

export class UserRouter {
  router: Router;
  path: string;
  controller: UserController;

  constructor(path: string) {
    (this.router = Router()), (this.path = path);
    this.controller = new UserController();
  }
}