import { Observable } from 'rxjs'
import { FlightDTO } from './../../flight/dto/flight.dto'
import { IPassenger } from './passenger.interface'

export interface IFlight {
  pilot: string
  airplane: string
  destinationCity: string
  flightDate: Date
  passengers: IPassenger[]
}

export interface IFlightRepository {
  create(flightDto: FlightDTO): Observable<IFlight>
  findAll(): Observable<IFlight[]>
  findOne(id: string): Observable<IFlight>
  update(id: string, flightDTO: FlightDTO): Observable<IFlight>
  delete(id: string): Observable<any>
  addPassenger(flightId: string, passengerId: string)
}
