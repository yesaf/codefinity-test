import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "@/models/user";
import { UserChat } from "@/models/userChat";
import { Message } from "@/models/message";

@Table({ modelName: "Chat", timestamps: false })
export class Chat extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  id: string;

  @BelongsToMany(() => User, () => UserChat)
  users: User[];

  @HasMany(() => Message, "chat")
  messages: Message[];

  async addUsers(users: string[]) {
    await UserChat.bulkCreate(
      users.map((userId) => ({
        userId,
        chatId: this.id,
      }))
    );
  }
}


