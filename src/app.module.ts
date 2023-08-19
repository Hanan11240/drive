import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { FoldersModule } from './folders/folders.module';

@Module({
  imports: [ConfigModule.forRoot({
   envFilePath: `.env.${process.env.NODE_ENV}`,
    isGlobal: true,
    cache: true,
  }),
  MongooseModule.forRootAsync({
    inject:[ConfigService],
    useFactory: (configService: ConfigService) => {
      const resolvedMongoUri = configService.get<string>('MONGODB_URI');
      console.log('Resolved MongoDB URI:', resolvedMongoUri);
      return {
        uri: resolvedMongoUri,
      }; 
    },
  }),
  FilesModule,
  AuthModule,
  FoldersModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
