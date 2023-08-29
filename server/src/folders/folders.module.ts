import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderSchema } from './schema/folder.schema';
import { UserSchema } from 'src/auth/schema/UserSchema';
import { FilesService } from 'src/files/files.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [FilesModule,
    MongooseModule.forFeature([{ name: 'folders', schema: FolderSchema },{name:'users',schema:UserSchema}]),
  ],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
