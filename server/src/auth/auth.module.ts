import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { MailModule } from 'src/utils/mail/mail.module';

@Module({
  imports:[MongooseModule.forFeature([{name:'users',schema:UserSchema}]),MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
