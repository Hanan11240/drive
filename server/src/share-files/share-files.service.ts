import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ShareFilesDto } from './dto/shareFiles.dto';
import { UserDTO } from 'src/auth/dto/user.dto';

@Injectable()
export class ShareFilesService {
    


    constructor(@InjectModel('sharefiles') private shareFilesModel: Model<ShareFilesDto>, @InjectModel('users') private userModelDto: Model<UserDTO>) { }

    async shareFiles(shareFilesInfo: ShareFilesDto) {
        const { sharedWith, fileId, folderId } = shareFilesInfo;
        const allUserExists = await this.userModelDto.find({ email: { $in: sharedWith } })
        if (!allUserExists.length)
            throw new HttpException('Some Users not found', HttpStatus.BAD_REQUEST)
        const fileOrFolderShared = await this.shareFilesModel.find({ sharedWith: { $in: sharedWith }, $or: [{ fileId: fileId }, { folderId: folderId }] })
        if (fileOrFolderShared.length)
            throw new HttpException('File or folder alreary shared with some of the users user', HttpStatus.BAD_REQUEST)
        new this.shareFilesModel(shareFilesInfo).save()
        return 
    }
    
   async  filesFoldersSharedWithMe(userId: string) {

      }
}
