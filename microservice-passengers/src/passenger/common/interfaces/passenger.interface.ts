import { PassengerDTO } from './../../dto/passenger.dto'

export interface IPassenger extends Document {
  name: string
  email: string
}

export interface IPassengerRepository {
  create(passengerDTO: PassengerDTO): Promise<IPassenger>
  findAll(): Promise<IPassenger[]>
  findOne(id: string): Promise<IPassenger>
  update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger>
  delete(id: string): Promise<any>
}
