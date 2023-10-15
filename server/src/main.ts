import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports,format } from 'winston';
import 'winston-daily-rotate-file'
import { Logger } from './utils/custom logger/winstonLogger';
import { AllExceptionFilter } from './utils/Filter/ExceptionFilter';

async function bootstrap() {
  const customLoggerService = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
      logger: WinstonModule.createLogger(customLoggerService.createLoggerConfig)
    }
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());
  // app.use(session({
  //   secret:'',
  //   resave:false,
  //   saveUninitialized:false,
  //   cookie:{maxAge:60000,secure:false,httpOnly:true}
  // }))
  await app.listen(3000);
}
bootstrap();
