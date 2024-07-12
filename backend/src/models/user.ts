import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsUrl,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ modelName: "User", timestamps: false })
export class User extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  username: string;

  @AllowNull(false)
  @IsUrl
  @Column(DataType.STRING)
  avatar: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  online: boolean;
}
