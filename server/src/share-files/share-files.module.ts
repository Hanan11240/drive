import { Module } from '@nestjs/common';
import { ShareFilesService } from './share-files.service';
import { ShareFilesController } from './share-files.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShareFilesSchema } from './schema/shareFiles.schema';
import { UserSchema } from 'src/auth/schema/UserSchema';

@Module({
  imports:[MongooseModule.forFeature([{name:'sharefiles',schema:ShareFilesSchema},{name:"users",schema:UserSchema}])],
  controllers: [ShareFilesController],
  providers: [ShareFilesService],
})
export class ShareFilesModule {}
