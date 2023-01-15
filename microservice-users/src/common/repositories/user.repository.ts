import { UserDTO } from './../../user/dto/user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { USER } from './../models/models'
import { IUser } from './../interfaces/user.interface'
import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

Injectable()
export class UserRespository {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async create(userDTO: UserDTO, hash: string): Promise<IUser> {
    const newUser = new this.model({ ...userDTO, password: hash })
    return await newUser.save()
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find()
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id)
  }

  async update(id: string, hash: string, userDTO: UserDTO): Promise<IUser> {
    const user = { ...userDTO, password: hash }
    return await this.model.findByIdAndUpdate(id, user, { new: true })
  }

  async delete(id: string): Promise<any> {
    await this.model.findByIdAndDelete(id)

    return {
      status: 200,
      msg: 'Deleted',
    }
  }

  async findByUsername(username: string): Promise<IUser> {
    return await this.model.findOne({ username })
  }
}
