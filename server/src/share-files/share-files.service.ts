import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ShareFilesDto } from './dto/shareFiles.dto';
import { UserDTO } from 'src/auth/dto/user.dto';
import { copyFileSync } from 'fs';
import { MailService } from 'src/utils/mail/mail.service';

@Injectable()
export class ShareFilesService {
  constructor(
    @InjectModel('sharefiles') private shareFilesModel: Model<ShareFilesDto>,
    @InjectModel('users') private userModelDto: Model<UserDTO>,
    private mailService: MailService,
  ) {}

  async shareFiles(shareFilesInfo: ShareFilesDto, origin: string) {
    const { sharedWith, file, folderId } = shareFilesInfo;
    const allUserExists = await this.userModelDto.find({
      email: { $in: sharedWith },
    });
    if (!allUserExists.length)
      throw new HttpException('Some Users not found', HttpStatus.BAD_REQUEST);
    const query = {
      sharedWith: { $in: sharedWith },
      $or: [],
    };

    if (file && file.fileId) {
      query.$or.push({ 'file.fileId': file.fileId });
    }

    if (folderId) {
      query.$or.push({ folderId: folderId });
    }
    const fileOrFolderShared = await this.shareFilesModel.find(query);
    if (fileOrFolderShared.length)
      throw new HttpException(
        'File or folder alreary shared with some of the users user',
        HttpStatus.BAD_REQUEST,
      );
    const saveQuery =
      file && file.fileId
        ? { 'file.fileId': file.fileId }
        : { folderId: folderId };
    await this.shareFilesModel.findOneAndUpdate(
      saveQuery,
      {
        $set: {
          folderId: folderId || null,
          file: file || null,
          ownerId: shareFilesInfo.ownerId,
        },
        $push: { sharedWith: shareFilesInfo.sharedWith },
      },
      { upsert: true },
    );
    const url = `${origin}/shared-file-with-me?${
      folderId ? 'folderId' : 'fileId'
    }=${folderId || file.fileId}`;
    console.log(url);
    this.mailService.sendMail(
      shareFilesInfo.sharedWith,
      'Share File',
      './shareLink',
      { url: url },
    );
    return;
  }

  async filesSharedWithMe(userId: string) {
    const userExists = await this.userModelDto.findOne({
      _id: new Types.ObjectId(userId),
    });
    if (!userExists)
      throw new HttpException('No user found', HttpStatus.BAD_REQUEST);
    const sharedFiles = await this.shareFilesModel.aggregate([
      {
        $match: {
          sharedWith: userExists.email,
        },
      },
      {
        $unwind: '$file',
      },
      {
        $project: {
          fileName: '$file.fileName',
          fileId: '$file.fileId',
          _id: 0, // Exclude the _id field from the output
        },
      },
    ]);
    return sharedFiles;
  }

  async foldersSharedWithMe(userId: string, folderId: string) {
    const userExists = await this.userModelDto.findOne({
      _id: new Types.ObjectId(userId),
    });
    if (!userExists)
      throw new HttpException('No user found', HttpStatus.BAD_REQUEST);
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
          _id: 0,
        },
      },
      {
        $lookup: {
          from: 'folders', // The name of the Folders collection
          localField: 'folderId',
          foreignField: '_id',
          as: 'folder',
        },
      },
      {
        $unwind: '$folder', // Unwind the folder array created by $lookup
      },
      {
        $project: {
          // Project the desired fields from the "folder" subdocument
          _id: '$folder._id',
          folderName: '$folder.folderName',
        },
      },
    ]);
    return sharedFolders;
  }

  async fetchUsers(searchText?: string) {
    const escapedSearchText = searchText ? searchText.replace(/\\/g, '') : '';
    const query = searchText
      ? { email: { $regex: escapedSearchText, $options: 'i' } }
      : {};
    const users = await this.userModelDto
      .find(query, { email: 1, _id: 0 })
      .limit(10);
    return users;
  }


}
