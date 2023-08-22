import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId, isObjectIdOrHexString } from 'mongoose';

export class FoldersModel {
  @IsString()
  @IsNotEmpty()
  folderName: string;
  @IsOptional()
  @IsArray()
  fileIds: ObjectId[];
  @IsString()
  @IsOptional()
  parentFolderId: ObjectId;
  @IsNumber()
  @IsOptional()
  childNumber: number;
  @IsString()
  userId: ObjectId;
}
