import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from './dto/user.dto';
import { Model } from 'mongoose';
import { MailService } from 'src/utils/mail/mail.service';


@Injectable()
export class AuthService {
 
 
 constructor(@InjectModel('users') private userModelDto:Model<UserDTO>,private mailerService:MailService){}
  async signUp(userModel:UserDTO){

    const {email} = userModel
    const query = {email:email}
    const userExists = await this.userModelDto.findOne(query)
    if(userExists)
    throw new HttpException('User exists',HttpStatus.BAD_REQUEST)

    const newUser = new this.userModelDto(userModel).save();
    return 

 }
async login(authModel: Pick<UserDTO, "email" | "password">) {
 const {email,password}= authModel;
 const query = {email:email,password:password}

 const userExists = await this.userModelDto.findOne(query,{password:0})
 
 if(!userExists)
 throw new HttpException('Incorrect credentials',HttpStatus.UNAUTHORIZED);

 return userExists
}
}
