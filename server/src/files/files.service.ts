import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import mongoose, { Connection, Model } from 'mongoose';
import { GridFSBucketReadStream } from 'mongodb';
import { FileInfoVm } from './model/fileINfoVm';
import { UserDTO } from 'src/auth/dto/user.dto';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel('users') private userModelDto: Model<UserDTO>,
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

  async userInfoToFile(userId: string, files) {
    const fileIds: string[] = files.map((file) => file.id);
    const query = { _id: userId };
    const update = { $push: { fileIds: fileIds } };
    await this.userModelDto.findOneAndUpdate(query, update);
    return;
  }

  async userExhaustedSapceLimit(params:{userId:string},fileSize):Promise<boolean>{
    const {userId} = params
    const query = {_id:userId}
          const userExists = await this.userModelDto.findOne(query);
          if(!userExists)
          throw new HttpException('User not found',HttpStatus.BAD_REQUEST)

        if(userExists.spaceConsumed === userExists.AllocatedSpace)
        throw new HttpException('Limit exhausted',HttpStatus.BAD_REQUEST)
      if(userExists.spaceConsumed + fileSize >= userExists.AllocatedSpace)
      throw new HttpException('Cannot upload not enough space',HttpStatus.BAD_REQUEST)

    return false
  }
}
