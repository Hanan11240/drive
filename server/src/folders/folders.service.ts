import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { FoldersModel } from './dto/folder..dto';
import { UserDTO } from 'src/auth/dto/user.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel('folders') private folderModelDto: Model<FoldersModel>,
    @InjectModel('users') private userModelDto: Model<UserDTO>,
    private readonly filesService: FilesService,
  ) {}

  async createFolder(
    folder: Partial<FoldersModel> & { userId: string },
  ): Promise<void> {
    const { userId, parentFolderId, folderName, childNumber } = folder;
    const query = {
      userId: new Types.ObjectId(userId),
      folderName: folderName,
      childNumber: 0,
    };
    if (!parentFolderId) {
      const folderNameExists = await this.folderModelDto.findOne(query);
      if (folderNameExists)
        throw new HttpException(
          'Folder name exists at this level',
          HttpStatus.BAD_REQUEST,
        );
      new this.folderModelDto(folder).save();
    } else {
      const [{ childNumber }, { folderNestLimit }] = await Promise.all([
        this.folderModelDto.findOne(
          { _id: parentFolderId },
          { childNumber: 1, _id: 0 },
        ),
        this.userModelDto.findOne(
          { _id: userId },
          { folderNestLimit: 1, _id: 0 },
        ),
      ]);

      if (childNumber >= folderNestLimit)
        throw new HttpException(
          'Cannot nest more folders',
          HttpStatus.BAD_REQUEST,
        );
      folder.childNumber = childNumber + 1;

      new this.folderModelDto(folder).save();
    }
    return;
  }
  async deleteFolder(folderId: string, userId: string): Promise<void> {

    const folderIds = await this.folderModelDto.find({$or:[{_id:folderId},{parentFolderId:folderId}]})
    for(const folderId of folderIds){
      await this.deleteFilesInFolder(folderId._id,userId)
    }
  
    await this.folderModelDto.deleteMany({ _id:{$in:folderIds} });
    return;
  }

  async deleteFilesInFolder(folderId:Types.ObjectId,userId:string){
    const fileIds = await this.folderModelDto.findOne(
      { _id: folderId },
      { fileIds: 1, _id: 0 },
    );
    if (!fileIds) {
      throw new HttpException('No folder found', HttpStatus.BAD_REQUEST);
    }
    const { fileIds: ids } = fileIds;
    for (const id of ids) {
      const idAsString = (id as ObjectId).toString();
      const fileInfo = await this.filesService.findInfo(idAsString);
      await this.filesService.deleteFile(idAsString);
      await this.filesService.updateUserConsumedSpace(userId, fileInfo);
    }
  }

  async renameFolder(folderId: string, userId: string, folderName: string):Promise<void> {
    const { childNumber } = await this.folderModelDto.findOne({
      _id: folderId,
    });
    const query = {
      userId: new Types.ObjectId(userId),
      folderName: folderName,
      childNumber: childNumber,
    };

    const folderWithSameNameExists = await this.folderModelDto.findOne(query);
    if (folderWithSameNameExists)
      throw new HttpException('Folder exists', HttpStatus.BAD_REQUEST);
    await this.folderModelDto.findOneAndUpdate(
      { _id: folderId },
      { $set: { folderName: folderName } },
    );
    return;
  }
}
