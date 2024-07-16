import http from "http";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import fs from "fs";
import { Boom, isBoom } from "@hapi/boom";

import sequelize, { dbPath } from "@/config/sequelize";

import { UserRouter } from "@/routers/user";
import { ChatRouter } from "@/routers/chat";

import { socketServer } from "@/socket/socket";

import { initializeBots } from "@/utils/bots";

(async () => {
  const app = express();
  const PORT = 3000;

  // Delete database if exists
  if (fs.existsSync(dbPath)) {
    await fs.unlink(dbPath, () => {});
  }
  await sequelize.sync({ force: true });

  const bots = initializeBots();

  app.use(express.json());
  app.use(cors());

  const routes = [new UserRouter("/users"), new ChatRouter("/chats")];
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });

  app.use((req, res) => {
    console.log(req);
    return res.status(404).send("Endpoint not found");
  });

  app.use(function (err: Error | Boom, req: Request, res: Response, next: NextFunction) {
    if (isBoom(err)) {
      const errorPayload = err.output.payload;
      return res.status(errorPayload.statusCode).send({
        status: errorPayload.statusCode,
        message: errorPayload.message,
        body: errorPayload,
      });
    }
    return res.status(500).send({
      status: 500,
      message: "Internal server error.",
      body: err,
    });
  });

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  socketServer(io, bots);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
