import { Sequelize } from "sequelize-typescript";
import models from "@/models";

export const dbPath = "./database.sqlite";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  models
});

export default sequelize;
