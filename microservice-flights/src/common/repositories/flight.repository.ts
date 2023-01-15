import { FlightDTO } from './../../flight/dto/flight.dto'
import { IFlight } from './../interfaces/flight.interface'
import { InjectModel } from '@nestjs/mongoose'
import { FLIGHT } from './../models/models'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class FlightRepository {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async create(flightDTO: FlightDTO): Promise<IFlight> {
    const newFlight = new this.model({ ...flightDTO })
    return await newFlight.save()
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers')
  }

  async findOne(id: string): Promise<IFlight> {
    return await (await this.model.findById(id)).populate('passengers')
  }

  async update(id: string, flightDTO: FlightDTO): Promise<IFlight> {
    const flight = { ...flightDTO }
    return await this.model.findByIdAndUpdate(id, flight, { new: true })
  }

  async delete(id: string): Promise<any> {
    await this.model.findByIdAndDelete(id)

    return {
      status: 200,
      msg: 'Deleted',
    }
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers')
  }
}
