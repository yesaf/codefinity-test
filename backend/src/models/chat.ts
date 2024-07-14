import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "@/models/user";
import { UserChat } from "@/models/userChat";

@Table({ modelName: "Chat", timestamps: false })
export class Chat extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  id: string;

  @BelongsToMany(() => User, () => UserChat)
  users: User[];

  async addUsers(users: string[]) {
    await UserChat.bulkCreate(
      users.map((userId) => ({
        userId,
        chatId: this.id,
      }))
    );
  }
}


