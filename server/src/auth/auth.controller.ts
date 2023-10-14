import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express'
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }
  @Post('signUp')
  async signUp(@Res() res: Response, @Body() userModel: UserDTO) {
    await this.authService.signUp(userModel)
    res.status(HttpStatus.OK).json({ message: 'User registered successfully' })
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() res: Response, @Body() authModel: AuthDto, @Req() req: Request) {
    const user = await this.authService.login(authModel)
    return req.user
  }
}
