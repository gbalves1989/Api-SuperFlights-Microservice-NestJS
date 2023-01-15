import { RabbitMQ } from './passenger/common/constants'
import { Transport } from '@nestjs/microservices/enums'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: RabbitMQ.PassengerQueue,
      },
    },
  )
  await app.listen()
}
bootstrap()
