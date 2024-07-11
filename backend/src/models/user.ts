import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, IsEmail, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({modelName: "User", timestamps: false})
export class User extends Model {
    @AllowNull(false)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.CHAR(36))
    id: string
    
    @AllowNull(false)
    @Column(DataType.STRING)
    username: string

    @Column(DataType.BOOLEAN)
    online: boolean
}