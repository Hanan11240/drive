import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports,format } from 'winston';
import 'winston-daily-rotate-file'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    logger:WinstonModule.createLogger({
      transports:[
        //file on daily rotation (error only) 
        new transports.DailyRotateFile({
          filename:`logs/%DATE%-error.log`,
          level:'error',
          format:format.combine(format.timestamp(),format.json(), format.prettyPrint()),
          datePattern:'YYYY_MM_DD',
          zippedArchive:false,  //don't want to zip our logs
          maxFiles:'30d'         //will keep log until they are older than 30 days
        }),
        // same for all levels
        new transports.DailyRotateFile({
          filename:'logs/%DATE%-combined.log',
          format:format.combine(format.timestamp(),format.json(),format.prettyPrint()),
        zippedArchive:false,
        maxFiles:'30d'
        }),
        new transports.Console({
          format:format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info)=>{
              return `${info.timestamp} ${info.level}: ${info.message}`
            })
          )
        })
      ]
    })
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
