import { UserDTO } from './../../user/dto/user.dto'

export interface IUser extends Document {
  name: string
  username: string
  email: string
  password: string
}

export interface IUserRepository {
  create(userDTO: UserDTO): Promise<IUser>
  findAll(): Promise<IUser[]>
  findOne(id: string): Promise<IUser>
  update(id: string, userDTO: UserDTO): Promise<IUser>
  delete(id: string): Promise<any>
}
