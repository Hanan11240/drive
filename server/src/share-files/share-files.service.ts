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
    const query = {
      sharedWith: { $in: sharedWith },
      $or: []
    };

    if (fileId) {
      query.$or.push({ fileId: fileId });
    }

    if (folderId) {
      query.$or.push({ folderId: folderId });
    }
    const fileOrFolderShared = await this.shareFilesModel.find(query)
    if (fileOrFolderShared.length)
      throw new HttpException('File or folder alreary shared with some of the users user', HttpStatus.BAD_REQUEST)
    new this.shareFilesModel(shareFilesInfo).save()
    return
  }

  async filesSharedWithMe(userId: string) {

  }

  async foldersSharedWithMe(userId: string, folderId: string) {
    const userExists = await this.userModelDto.findOne({ _id: new Types.ObjectId(userId) })
    if (!userExists)
      throw new HttpException('No user found', HttpStatus.BAD_REQUEST)
    const sharedFolders = await this.shareFilesModel.aggregate([
      {
        $match: {
          sharedWith: userExists.email, // Match documents where the sharedWith array contains the specified email address
        },
      },
      {
        $project: {
          // Define the fields you want to include in the result
          hasExpiry: 1,
          folderId: 1,
          fileId: 1,
          _id: 0
        },
      },
      {
        $lookup: {
          from: "folders", // The name of the Folders collection
          localField: "folderId",
          foreignField: "_id",
          as: "folder",
        },
      },
      {
        $unwind: "$folder", // Unwind the folder array created by $lookup
      },
      {
        $project: {
          // Project the desired fields from the "folder" subdocument
          folderId: "$folder._id",
          folderName: "$folder.folderName",

        },
      },
    ])
    return sharedFolders
  }
}
