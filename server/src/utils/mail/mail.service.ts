import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailservice:MailerService){}
    sendMail(emailAddress:string | string[],subject:string,template:string,context:Record<string,string>){
        this.mailservice.sendMail({
            to:emailAddress,
            subject:subject,
            template:`${template}`,
            context:context
        }).then(()=>console.log('mail sent')).catch(error => {throw new HttpException(`${error}`,HttpStatus.BAD_REQUEST)})
    }
}
