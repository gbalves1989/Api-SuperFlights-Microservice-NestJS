import { FlightMSG } from './../common/constants'
import { MessagePattern, Payload } from '@nestjs/microservices/decorators'
import { FlightService } from './flight.service'
import {
  IFlight,
  IFlightRepository,
} from './../common/interfaces/flight.interface'
import { Controller } from '@nestjs/common'
import { FlightDTO } from './dto/flight.dto'

@Controller()
export class FlightController implements IFlightRepository {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FlightMSG.ADD_PASSENGER)
  addPassenger(@Payload() payload): Promise<IFlight> {
    return this.flightService.addPassenger(
      payload.flightId,
      payload.passengerId,
    )
  }

  @MessagePattern(FlightMSG.DELETE)
  delete(@Payload() id: string): Promise<any> {
    return this.flightService.delete(id)
  }

  @MessagePattern(FlightMSG.UPDATE)
  update(@Payload() payload: any): Promise<IFlight> {
    return this.flightService.update(payload.id, payload.flightDTO)
  }

  @MessagePattern(FlightMSG.FIND_ONE)
  findOne(@Payload() id: string): Promise<IFlight> {
    return this.flightService.findOne(id)
  }

  @MessagePattern(FlightMSG.FIND_ALL)
  findAll(): Promise<IFlight[]> {
    return this.flightService.findAll()
  }

  @MessagePattern(FlightMSG.CREATE)
  create(@Payload() flightDTO: FlightDTO): Promise<IFlight> {
    return this.flightService.create(flightDTO)
  }
}
