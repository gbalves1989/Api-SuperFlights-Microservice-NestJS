import { ApiOperation } from '@nestjs/swagger/dist'
import { UserDTO } from './../user/dto/user.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'
import { Controller, Body, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Authentication')
@Controller('/api/v2/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiOperation({
    summary: 'User login',
    description: 'Return a token valid',
  })
  async signIn(@Req() req) {
    return await this.authService.signIn(req.user)
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user',
  })
  async signUp(@Body() userDTO: UserDTO) {
    return await this.authService.signUp(userDTO)
  }
}
