import { UserController } from "@/controllers/user";
import { Router } from "express";

export class UserRouter {
  router: Router;
  path: string;
  controller: UserController;

  constructor(path: string) {
    (this.router = Router()), (this.path = path);
    this.controller = new UserController();
    this.router.get("/", this.controller.getAllUsers);
    this.router.get("/:id", this.controller.getUserById);
    this.router.get("/except/:id", this.controller.getUsersExceptId);
    this.router.post("/", this.controller.createUser);
  }
}
