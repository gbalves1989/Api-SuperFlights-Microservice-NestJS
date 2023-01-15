import { FlightDTO } from './../../flight/dto/flight.dto'
import { IPassenger } from './passenger.interface'

export interface IFlight extends Document {
  pilot: string
  airplane: string
  destinationCity: string
  flightDate: Date
  passengers: IPassenger[]
}

export interface IFlightRepository {
  create(flightDTO: FlightDTO): Promise<IFlight>
  findAll(): Promise<IFlight[]>
  findOne(id: string): Promise<IFlight>
  update(id: string, flightDTO: FlightDTO): Promise<IFlight>
  delete(id: string): Promise<any>
  addPassenger(flightId: string, passengerId: string): Promise<IFlight>
}
