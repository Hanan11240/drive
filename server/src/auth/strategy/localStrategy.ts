import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
    async validate(email:string,password:string):Promise<any>{
     const user =  await  this.authService.validateuser(email,password);
     if(!user){
        throw new HttpException('incorrect credentials',HttpStatus.UNAUTHORIZED)
     }
     return user
    }
}