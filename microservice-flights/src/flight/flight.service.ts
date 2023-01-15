import { IFlight } from './../common/interfaces/flight.interface'
import { FlightDTO } from './dto/flight.dto'
import { FlightRepository } from './../common/repositories/flight.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FlightService {
  constructor(private readonly flightRepository: FlightRepository) {}

  async create(flightDTO: FlightDTO): Promise<IFlight> {
    return await this.flightRepository.create(flightDTO)
  }

  async findAll(): Promise<IFlight[]> {
    return await this.flightRepository.findAll()
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.flightRepository.findOne(id)
  }

  async update(id: string, flightDTO: FlightDTO): Promise<IFlight> {
    return await this.flightRepository.update(id, flightDTO)
  }

  async delete(id: string): Promise<any> {
    return await this.flightRepository.delete(id)
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.flightRepository.addPassenger(flightId, passengerId)
  }
}
