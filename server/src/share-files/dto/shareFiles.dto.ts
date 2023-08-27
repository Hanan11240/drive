import { IsArray, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class ShareFilesDto{
    @IsString()
    ownerId:string;
    @IsArray()
    sharedWith:string[];
    @IsOptional()
    @IsNumber()
    hasExpiry:boolean;
    @IsOptional()
    @IsNumber()
    expiryDate:Number;
    @IsOptional()
    folderId:string;
    @IsOptional()
    fileId:string
}