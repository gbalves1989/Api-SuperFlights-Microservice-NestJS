import { ProxyModule } from './common/proxy/proxy.module'
import { AuthModule } from './auth/auth.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { PassengerModule } from './passenger/passenger.module'
import { FlightModule } from './flight/flight.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    UserModule,
    PassengerModule,
    FlightModule,
    AuthModule,
    ProxyModule,
  ],
})
export class AppModule {}
