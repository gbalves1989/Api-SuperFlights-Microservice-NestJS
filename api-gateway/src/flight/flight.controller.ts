import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { FlightMSG, PassengerMSG } from './../common/constants'
import { Observable } from 'rxjs'
import {
  IFlight,
  IFlightRepository,
} from './../common/interfaces/flight.interface'
import { ClientProxySuperFlights } from './../common/proxy/client-proxy'
import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common'
import { FlightDTO } from './dto/flight.dto'
import { HttpException } from '@nestjs/common/exceptions'
import { HttpStatus } from '@nestjs/common/enums'
import { ApiTags } from '@nestjs/swagger'
import { HttpCode, UseGuards } from '@nestjs/common/decorators'

@ApiTags('flights')
@UseGuards(JwtAuthGuard)
@Controller('/api/v2/flight')
export class FlightController implements IFlightRepository {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private _clientProxyFlight = this.clientProxy.clientProxyFlights()
  private _clientProxyPassenger = this.clientProxy.clientProxyPassengers()

  @Post()
  create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMSG.CREATE, flightDTO)
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this._clientProxyFlight.send(FlightMSG.FIND_ALL, '')
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() flightDTO: FlightDTO,
  ): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMSG.UPDATE, { id, flightDTO })
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyFlight.send(FlightMSG.DELETE, id)
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this._clientProxyPassenger
      .send(PassengerMSG.FIND_ONE, passengerId)
      .toPromise()

    if (!passenger) {
      throw new HttpException('Passenger not found.', HttpStatus.NOT_FOUND)
    }

    return this._clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    })
  }
}
