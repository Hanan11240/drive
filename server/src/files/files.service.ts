import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import mongoose, { Connection, Model } from 'mongoose';
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
    @InjectModel('folders') private folderModel:Model<FoldersModel>
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

  async deleteFile(id: string ): Promise<boolean> {
    return await this.fileModel.delete(id);
  }

  async userInfoToFile(userId: string, files,folderId:string) {
    const fileInfo: { totalSize: number; fileIds: string[] } = files.reduce(
      (accumulator, file) => {
        accumulator.fileIds.push(file.id);
        accumulator.totalSize += file.size;
        return accumulator;
      },
      { fileIds: [], totalSize: 0 },
    );
    const { fileIds, totalSize } = fileInfo;
    const userQuery = { _id:  userId };
    const folderQuery = { _id:  folderId };
    const update = {
      $push: { fileIds: fileIds },
      $inc: { spaceConsumed: totalSize },
    };
    await this.userModelDto.findOneAndUpdate(userQuery, update);
    if(folderId)
    await this.folderModel.findByIdAndUpdate(folderQuery,{$push:{fileIds:fileIds}})
    
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

  async updateUserConsumedSpace(userId: string, file: FileInfoVm) {
    const {length} = file
     await this.userModelDto.findByIdAndUpdate({_id:userId},{$inc:{spaceConsumed
      :-length}})
    return;
  }
}
