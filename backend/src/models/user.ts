import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsUrl,
  Model,
  PrimaryKey,
  Table,
  BelongsToMany,
} from "sequelize-typescript";

import { Chat } from "@/models/chat";
import { UserChat } from '@/models/userChat';

@Table({ modelName: "User", timestamps: false })
export class User extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @IsUrl
  @Column(DataType.STRING)
  avatar: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  online: boolean;

  @Column(DataType.STRING)
  description: string;

  @BelongsToMany(() => Chat, () => UserChat)
  chats: Chat[];
}
