
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isArray } from 'class-validator';
export class UserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsOptional()
  AllocatedSpace: number;

  @IsOptional()
  @IsArray()
  fileIds:fileType[]

  @IsOptional()
  @IsNumber()
  spaceConsumed:number


  // @IsOptional()
  // @IsArray()
  // folderIds:ObjectId[]

  @IsOptional()
  @IsNumber()
  folderNestLimit:number
}

interface fileType{
  fileId:string;
  isParent:boolean
}
