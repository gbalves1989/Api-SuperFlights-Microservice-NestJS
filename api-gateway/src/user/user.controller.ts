import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { UserMSG } from './../common/constants'
import { Observable } from 'rxjs'
import { UserDTO } from './dto/user.dto'
import { ClientProxySuperFlights } from './../common/proxy/client-proxy'
import { IUser, IUserRepository } from './../common/interfaces/user.interface'
import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common'
import { HttpCode, UseGuards } from '@nestjs/common/decorators'

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('/api/v2/user')
export class UserController implements IUserRepository {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private _clientProxyUser = this.clientProxy.clientProxyUsers()

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO })
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyUser.send(UserMSG.DELETE, id)
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this._clientProxyUser.send(UserMSG.FIND_ALL, '')
  }

  @Post()
  create(@Body() userDTO: UserDTO): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.CREATE, userDTO)
  }
}
