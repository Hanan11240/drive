import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import mongoose, { Connection, Model, Types } from 'mongoose';
import { GridFSBucketReadStream } from 'mongodb';
import { FileInfoVm } from './model/fileINfoVm';
import { UserDTO } from 'src/auth/dto/user.dto';
import { FoldersModel } from 'src/folders/dto/folder..dto';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel('users') private userModelDto: Model<UserDTO>,
    @InjectModel('folders') private folderModel: Model<FoldersModel>,
  ) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }
  async findInfo(id: string): Promise<FileInfoVm> {
    const result = await this.fileModel
      .findById(id)
      .catch((err) => {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      })
      .then((result) => result);
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      contentType: result.contentType,
    };
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id);
  }

  async userInfoToFile(userId: string, files, folderId: string): Promise<void> {

    const fileInfo: {
      totalSize: number;
      fileIds: { fileId: string; isParent: boolean }[] | string;
    } = files.reduce(
      (accumulator, file) => {
        folderId
          ? accumulator.fileIds.push({fileId:file.id,fileName:file.originalname})
          : accumulator.fileIds.push({ fileId: file.id, isParent: true,fileName:file.originalname });
        accumulator.totalSize += file.size;
        return accumulator;
      },
      { fileIds: [], totalSize: 0 },
    );
    const { fileIds, totalSize } = fileInfo;
    const userQuery = { _id: userId };
    const folderQuery = { _id: folderId };
    const update = {
      $push: { fileIds: fileIds },
      $inc: { spaceConsumed: totalSize },
    };
    await this.userModelDto.findOneAndUpdate(userQuery, update);
    if (folderId)
      await this.folderModel.findByIdAndUpdate(folderQuery, {
        $push: { fileIds: fileIds },
      });

    return;
  }

  async userExhaustedSapceLimit(
    params: { userId: string },
    fileSize,
  ): Promise<boolean> {
    const { userId } = params;
    const query = { _id: userId };
    const userExists = await this.userModelDto.findOne(query);
    if (!userExists)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const spaceConsumed = parseInt(fileSize) + userExists.spaceConsumed;
    if (spaceConsumed >= userExists.AllocatedSpace) return true;
    return false;
  }

  async updateUserConsumedSpace(
    userId: string,
    file: FileInfoVm,
    fileId: string,
  ) {
    const { length } = file;
    await this.userModelDto.findByIdAndUpdate(
      { _id: userId },
      { $pull: { fileIds: fileId }, $inc: { spaceConsumed: -length } },
    );
    return;
  }

  async parentFiles(userId: string) {
    const pipeline = [
      {
        $match: {
          _id: new Types.ObjectId(userId),
        },
      },
      {
        $project: {
          _id: 0, // Exclude the "_id" field
          fileIds: {
            $map: {
              input: '$fileIds',
              as: 'file',
              in: {
                fileId: '$$file.fileId',
                fileName: '$$file.fileName',
                isParent: '$$file.isParent',
              },
            },
          },
        },
      },
      {
        $project: {
          fileIds: {
            $filter: {
              input: '$fileIds',
              as: 'file',
              cond: { $and: [{ $ne: ['$$file.fileId', null] }, '$$file.isParent'] },
            },
          },
        },
      },
    ];
    
    

    const result = await this.userModelDto.aggregate(pipeline);
    const fileIds = result[0]?.fileIds;
    return fileIds;
  }
}
