import { User } from "@/models/user";

export class UserDao {
  constructor() {}

  public static getAllUsers = async () => {
    const users = await User.findAll();
    return users
  };

  public static createUser = async (data: Partial<User>) => {
    console.log(data)
    const user = await User.create(data)
    return user
  };

  public static deleteUser = async (id: string) => {
    await User.destroy({
      where: {
        id
      }
    })
    return true
  };

  public static updateUser = async (id: string, updateData: Partial<User>) => {
    const updatedUser = await User.update(updateData, {
      where: {
        id: id,
      },
      returning: true
    })
    return updatedUser
  };
}