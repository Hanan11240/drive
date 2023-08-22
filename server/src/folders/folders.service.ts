import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FoldersModel } from './dto/folder..dto';
import { UserDTO } from 'src/auth/dto/user.dto';

@Injectable()
export class FoldersService {
  
  constructor(
    @InjectModel('folders') private folderModelDto: Model<FoldersModel>,
    @InjectModel('users') private userModelDto: Model<UserDTO>,
  ) {}

  async createFolder(folder: Partial<FoldersModel> & { userId: string }):Promise<void> {
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
 async deleteFolder(userId: string, folderId: string) {
  
  }
}
