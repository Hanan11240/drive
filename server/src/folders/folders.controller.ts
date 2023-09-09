import { Controller, HttpStatus, Post, Res, Body, Delete, Param, Patch, Query, Get } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { Response, query } from 'express';
import { FoldersModel } from './dto/folder..dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  async createFolder(
    @Res() res: Response,
    @Body() folder: Partial<FoldersModel> & { userId: string },
  ):Promise<void> {
  const addedFolder =  await this.foldersService.createFolder(folder);
    res.status(HttpStatus.OK).json(addedFolder);
  }
  
  @Delete(':folderId/:userId')
  async deleteFolder(@Res() res:Response,@Param() param:{folderId:string,userId:string}){
    const {folderId,userId} = param
    await this.foldersService.deleteFolder(folderId,userId)
    res.status(HttpStatus.OK).json({message:'success'})
  }

  @Patch('rename/:folderId')
  async renameFolder (@Res() res:Response,@Param() param:{folderId:string},@Query() query:{userId:string},@Body() body:{folderName:string}):Promise<void>{

    const {folderId} = param
    const {userId} = query
    const {folderName} = body
    await this.foldersService.renameFolder(folderId,userId,folderName)
    res.status(HttpStatus.OK).json({message:'success'})
  }
  @Get('parent-folders/:userId')
  async parentFolders(@Param() param:{userId:string},@Res() res:Response):Promise<void>{
    const {userId} = param
    const parentFolders = await this.foldersService.parentFolders(userId);
    res.status(HttpStatus.OK).json(parentFolders)

  }


  @Get('child-folders/:userId')
  async getChildFolders(@Param() params:{userId:string},@Query() query:{folderId:string},@Res() res:Response){
    const {userId} = params;
    const {folderId} = query
    const childFolders = await this.foldersService.childFolders(userId,folderId);
    res.status(HttpStatus.OK).json(childFolders)
  }
 
}
