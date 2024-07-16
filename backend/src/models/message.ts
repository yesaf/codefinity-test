import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUrl,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "@/models/user";
import { Chat } from "@/models/chat";

@Table({ modelName: "Message", timestamps: true })
export class Message extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  id: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.CHAR(36))
  senderId: string;

  @BelongsTo(() => User, "senderId")
  senderInfo: User;

  @AllowNull(false)
  @ForeignKey(() => Chat)
  @Column(DataType.CHAR(36))
  chat: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  text: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  seenAt: Date;
}
