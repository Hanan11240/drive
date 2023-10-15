import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/UserSchema';
import { MailModule } from 'src/utils/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth-guard';




@Module({
  imports:[MongooseModule.forFeature([{name:'users',schema:UserSchema}]),MailModule,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '6000s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
})
export class AuthModule {}
