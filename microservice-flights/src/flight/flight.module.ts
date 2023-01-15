import { FlightRepository } from './../common/repositories/flight.repository'
import { PassengerSchema } from './../flight/schema/passenger.schema'
import { PASSENGER, FLIGHT } from './../common/models/models'
import { FlightSchema } from './schema/flight.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { FlightController } from './flight.controller'
import { FlightService } from './flight.service'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        useFactory: () => FlightSchema.plugin(require('mongoose-autopopulate')),
      },
      {
        name: PASSENGER.name,
        useFactory: () =>
          PassengerSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
  ],
  controllers: [FlightController],
  providers: [FlightService, FlightRepository],
})
export class FlightModule {}
