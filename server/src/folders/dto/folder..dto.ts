import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class FolderModel {
  @IsString()
  @IsNotEmpty()
  folderName: string;
  @IsOptional()
  @IsArray()
  fileIds: ObjectId[];
  @IsString()
  @IsOptional()
  parentFolderId: ObjectId;
  @IsArray()
  folderIds: ObjectId[];
  @IsNumber()
  @IsOptional()
  childNumber: number;
}
