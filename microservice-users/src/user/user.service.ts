import { UserRespository } from './../common/repositories/user.repository'
import { UserDTO } from './dto/user.dto'
import { IUser } from './../common/interfaces/user.interface'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRespository) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }

  async create(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password)
    return this.userRepository.create(userDTO, hash)
  }

  async findAll(): Promise<IUser[]> {
    return this.userRepository.findAll()
  }

  async findOne(id: string): Promise<IUser> {
    return this.userRepository.findOne(id)
  }

  async update(id: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password)
    return this.userRepository.update(id, hash, userDTO)
  }

  async delete(id: string): Promise<any> {
    return this.userRepository.delete(id)
  }

  async findByUsername(username: string): Promise<IUser> {
    return await this.userRepository.findByUsername(username)
  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.hash(password, passwordDB)
  }
}
