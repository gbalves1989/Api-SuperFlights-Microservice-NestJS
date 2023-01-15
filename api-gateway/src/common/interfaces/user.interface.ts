import { Observable } from 'rxjs'
import { UserDTO } from './../../user/dto/user.dto'

export interface IUser {
  name: string
  username: string
  email: string
  password: string
}

export interface IUserRepository {
  create(userDto: UserDTO): Observable<IUser>
  findAll(): Observable<IUser[]>
  findOne(id: string): Observable<IUser>
  update(id: string, userDTO: UserDTO): Observable<IUser>
  delete(id: string): Observable<any>
}
