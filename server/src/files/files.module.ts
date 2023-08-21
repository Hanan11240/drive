import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schema/user.schema';

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: GridFsMulterConfigService,imports:[FilesModule] }),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
  ],
  controllers: [FilesController],
  providers: [FilesService, GridFsMulterConfigService],
  exports:[FilesService]
})
export class FilesModule {}
