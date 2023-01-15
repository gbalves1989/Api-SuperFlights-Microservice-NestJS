import { ProxyModule } from './../common/proxy/proxy.module'
import { Module } from '@nestjs/common'
import { PassengerController } from './passenger.controller'

@Module({
  imports: [ProxyModule],
  controllers: [PassengerController],
})
export class PassengerModule {}
