import { PassengerMSG } from './common/constants'
import { Payload } from '@nestjs/microservices/decorators'
import { MessagePattern } from '@nestjs/microservices'
import { PassengerService } from './passenger.service'
import {
  IPassenger,
  IPassengerRepository,
} from './common/interfaces/passenger.interface'
import { Controller } from '@nestjs/common'
import { PassengerDTO } from './dto/passenger.dto'

@Controller()
export class PassengerController implements IPassengerRepository {
  constructor(private readonly passengerService: PassengerService) {}

  @MessagePattern(PassengerMSG.DELETE)
  delete(@Payload() id: string): Promise<void> {
    return this.passengerService.delete(id)
  }

  @MessagePattern(PassengerMSG.UPDATE)
  update(@Payload() payload: any): Promise<IPassenger> {
    return this.passengerService.update(payload.id, payload.passengerDTO)
  }

  @MessagePattern(PassengerMSG.FIND_ONE)
  findOne(@Payload() id: string): Promise<IPassenger> {
    return this.passengerService.findOne(id)
  }

  @MessagePattern(PassengerMSG.FIND_ALL)
  findAll(): Promise<IPassenger[]> {
    return this.passengerService.findAll()
  }

  @MessagePattern(PassengerMSG.CREATE)
  create(@Payload() passengerDTO: PassengerDTO): Promise<IPassenger> {
    return this.passengerService.create(passengerDTO)
  }
}
