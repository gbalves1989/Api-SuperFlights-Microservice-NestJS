import { USER } from './../common/models/models'
import { UserRespository } from './../common/repositories/user.repository'
import { UserSchema } from './schema/user.schema'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USER.name,
        useFactory: () => {
          return UserSchema
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRespository],
})
export class UserModule {}
