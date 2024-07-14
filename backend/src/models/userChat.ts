import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "@/models/user";
import { Chat } from "@/models/chat";

@Table({ modelName: "UserChat", timestamps: false })
export class UserChat extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  id: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.CHAR(36))
  userId: string;

  @ForeignKey(() => Chat)
  @AllowNull(false)
  @Column(DataType.CHAR(36))
  chatId: string;
}