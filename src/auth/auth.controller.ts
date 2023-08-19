import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
   
  }
  @Post('signUp')
  async signUp(@Res() res:Response,@Body() userModel:UserDTO){
    await this.authService.signUp(userModel)
    res.status(HttpStatus.OK).json({message:'User registered successfully'})
  }

  @Post('login')
  async login(@Res() res:Response,@Body() authModel:Pick<UserDTO,'email' | 'password'>){
   const user =  await this.authService.login(authModel)
    res.status(HttpStatus.OK).json(user)
  }
}
