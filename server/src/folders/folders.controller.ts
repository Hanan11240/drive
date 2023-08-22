import { Controller, HttpStatus, Post, Res, Body, Delete, Param } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { Response } from 'express';
import { FoldersModel } from './dto/folder..dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  async createFolder(
    @Res() res: Response,
    @Body() folder: Partial<FoldersModel> & { userId: string },
  ):Promise<void> {
    await this.foldersService.createFolder(folder);
    res.status(HttpStatus.OK).json({message:'Success'});
  }
  @Delete()
  async deleteFolder(@Res() res:Response,@Param() param:{userId:string,folderId:string}){
    const {userId,folderId} = param
    await this.foldersService.deleteFolder(userId,folderId)
    res.status(HttpStatus.OK).json({message:'success'})

  }
}
