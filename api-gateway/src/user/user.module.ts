import { ProxyModule } from './../common/proxy/proxy.module'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'

@Module({
  imports: [ProxyModule],
  controllers: [UserController],
})
export class UserModule {}
