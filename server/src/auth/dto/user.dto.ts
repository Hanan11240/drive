
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, isArray } from 'class-validator';
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
  fileIds:string[]
}
