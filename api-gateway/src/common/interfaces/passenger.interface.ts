import { Observable } from 'rxjs'
import { PassengerDTO } from './../../passenger/dto/passenger.dto'

export interface IPassenger {
  name: string
  email: string
}

export interface IPassengerRepository {
  create(passengerDto: PassengerDTO): Observable<IPassenger>
  findAll(): Observable<IPassenger[]>
  findOne(id: string): Observable<IPassenger>
  update(id: string, passengerDTO: PassengerDTO): Observable<IPassenger>
  delete(id: string): Observable<any>
}
