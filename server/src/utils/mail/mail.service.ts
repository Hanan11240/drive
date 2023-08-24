import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    constructor(private mailservice:MailerService){}

    sendMail(emailAddress:string | string[],html:string,subject:string){
        this.mailservice.sendMail({
            to:emailAddress,
            subject:subject,
            text:`${html}`
        }).then().catch(error => {throw new HttpException(`${error}`,HttpStatus.BAD_REQUEST)})
    }
}
