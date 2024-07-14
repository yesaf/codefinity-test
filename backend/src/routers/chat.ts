import { ChatController } from "@/controllers/chat";
import { Router } from "express";

export class UserRouter {
  router: Router;
  path: string;
  controller: ChatController;

  constructor(path: string) {
    (this.router = Router()), (this.path = path);
    this.controller = new ChatController();
    this.router.get("/:id/messages", this.controller.getChatMessages);
  }
}
