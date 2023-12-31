import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { FoldersModule } from './folders/folders.module';
import { ShareFilesModule } from './share-files/share-files.module';
import { LoggerMiddleware } from './utils/middleware/logger.middleware';

 

@Module({
  imports: [ 
ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV}`,
    isGlobal: true,
    cache: true,
  }),
  MongooseModule.forRootAsync({
    inject:[ConfigService],
    useFactory: (configService: ConfigService) => {
      const resolvedMongoUri = configService.get<string>('MONGODB_URI');
      return {
        uri: resolvedMongoUri,
      }; 
    },
  }),
  FilesModule,
  AuthModule,
  FoldersModule,
  ShareFilesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  
}
