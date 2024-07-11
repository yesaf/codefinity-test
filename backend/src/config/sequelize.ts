import { Sequelize } from "sequelize-typescript";
import models from "@/models";
import config from "@/config/variables";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  models
});

export default sequelize;
