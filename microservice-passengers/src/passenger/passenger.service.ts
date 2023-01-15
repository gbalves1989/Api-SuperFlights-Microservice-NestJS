import { IPassenger } from './common/interfaces/passenger.interface'
import { PassengerDTO } from './dto/passenger.dto'
import { PassengerRepository } from './common/repositories/passenger.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PassengerService {
  constructor(private readonly passengerRepository: PassengerRepository) {}

  async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
    return this.passengerRepository.create(passengerDTO)
  }

  async findAll(): Promise<IPassenger[]> {
    return this.passengerRepository.findAll()
  }

  async findOne(id: string): Promise<IPassenger> {
    return this.passengerRepository.findOne(id)
  }

  async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
    return this.passengerRepository.update(id, passengerDTO)
  }

  async delete(id: string): Promise<any> {
    return this.passengerRepository.delete(id)
  }
}
