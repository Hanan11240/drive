import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express'
import { AuthGuard } from './guard/auth-guard';
import { Public } from './guard/public-routes';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }
  @Post('signUp')
  async signUp(@Res() res: Response, @Body() userModel: UserDTO) {
    await this.authService.signUp(userModel)
    res.status(HttpStatus.OK).json({ message: 'User registered successfully' })
  }

// @Public()
  @Post('login')
  async login( @Body() authModel: AuthDto, @Req() req: Request) {
    const user = await this.authService.login(authModel)
    return user
    // res.status(200).json(user)
  }
}
