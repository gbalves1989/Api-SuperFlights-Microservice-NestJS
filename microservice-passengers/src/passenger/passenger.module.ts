import { PassengerSchema } from './schema/passenger.schema'
import { PASSENGER } from './common/models/models'
import { MongooseModule } from '@nestjs/mongoose'
import { PassengerRepository } from './common/repositories/passenger.repository'
import { Module } from '@nestjs/common'
import { PassengerController } from './passenger.controller'
import { PassengerService } from './passenger.service'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASSENGER.name,
        useFactory: () => {
          return PassengerSchema
        },
      },
    ]),
  ],
  controllers: [PassengerController],
  providers: [PassengerService, PassengerRepository],
})
export class PassengerModule {}
