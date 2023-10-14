import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/UserSchema';
import { MailModule } from 'src/utils/mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/strategy/localStrategy';

@Module({
  imports:[MongooseModule.forFeature([{name:'users',schema:UserSchema}]),MailModule,PassportModule],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy],
})
export class AuthModule {}
