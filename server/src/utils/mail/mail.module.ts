import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Global()
@Module({
  imports:[MailerModule.forRootAsync({
    useFactory:async(config:ConfigService)=>({
      transport:{
        host:'noreply@com',
        secure:true,
        service:config.get<string>('Mail_SERVICE'),
        port:config.get<number>('MAIL_PORT'),
        auth:{
          user:config.get('MAIL_USER'),
          pass:config.get('MAIL_PASSWORD'),
        },
        tls:{
          rejectUnauthorized:true
        }
      },
      defaults:{
        from:'"NO Reply" <noreply@ecxample.com>'
      },
      template: {
        dir: join(__dirname, './templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: false,
        },
      },
    }),inject:[ConfigService]
  })],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
