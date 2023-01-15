import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { PassengerDTO } from './dto/passenger.dto'
import { PassengerMSG } from './../common/constants'
import { Observable } from 'rxjs'
import { ClientProxySuperFlights } from './../common/proxy/client-proxy'
import {
  IPassenger,
  IPassengerRepository,
} from './../common/interfaces/passenger.interface'
import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HttpCode, UseGuards } from '@nestjs/common/decorators'

@ApiTags('passengers')
@UseGuards(JwtAuthGuard)
@Controller('/api/v2/passenger')
export class PassengerController implements IPassengerRepository {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private _clientProxyPassenger = this.clientProxy.clientProxyPassengers()

  @Get()
  findAll(): Observable<IPassenger[]> {
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '')
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() passengerDTO: PassengerDTO,
  ): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.UPDATE, {
      id,
      passengerDTO,
    })
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyPassenger.send(PassengerMSG.DELETE, id)
  }

  @Post()
  create(@Body() passengerDTO: PassengerDTO): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.CREATE, passengerDTO)
  }
}
