import { UserMSG } from './../common/constants'
import { UserService } from './user.service'
import { Controller } from '@nestjs/common'
import { IUser, IUserRepository } from './../common/interfaces/user.interface'
import { UserDTO } from './dto/user.dto'
import { MessagePattern } from '@nestjs/microservices'
import { Payload } from '@nestjs/microservices/decorators'

@Controller()
export class UserController implements IUserRepository {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMSG.DELETE)
  delete(@Payload() id: string): Promise<any> {
    return this.userService.delete(id)
  }

  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: any): Promise<IUser> {
    return this.userService.update(payload.id, payload.userDTO)
  }

  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string): Promise<IUser> {
    return this.userService.findOne(id)
  }

  @MessagePattern(UserMSG.FIND_ALL)
  findAll(): Promise<IUser[]> {
    return this.userService.findAll()
  }

  @MessagePattern(UserMSG.CREATE)
  create(@Payload() userDTO: UserDTO): Promise<IUser> {
    return this.userService.create(userDTO)
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUser(@Payload() payload) {
    const user = await this.userService.findByUsername(payload.username)
    const isValidPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    )

    if (user && isValidPassword) {
      return user
    }

    return null
  }
}
