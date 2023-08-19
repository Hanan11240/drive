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
}
