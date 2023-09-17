import { Injectable,Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name)
  getHello(): string {
    this.logger.log({level:'warn',message:'This is test for warn',refCode:44444})
    try{
      throw new Error('Some Random error')
    }catch(error){
      this.logger.log({level:'error',message:'This is Error level',err:error})
    }
    return 'Hello World!';
  }
}
