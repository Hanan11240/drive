import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ShareFilesService } from './share-files.service';
import { ShareFilesDto } from './dto/shareFiles.dto';
import { Response,Request } from 'express'

@Controller('share-files')
export class ShareFilesController {
  constructor(private readonly shareFilesService: ShareFilesService) {
  }


  @Post()
  async shareFilesWithUser(@Body() body: ShareFilesDto, @Res() res: Response,@Req() req: Request): Promise<void> {
    const origin = req.get('origin');
    await this.shareFilesService.shareFiles(body,origin)
    res.status(HttpStatus.OK).json({ message: 'success' })
  }

  @Get('files/:userId')
  async filesSharedWithMe(@Param() param: { userId: string }, @Res() res: Response, @Query() query: { folderId: string }, @Param() params: { userId: string }): Promise<void> {
    const { userId } = params
    const sharedFiles = await this.shareFilesService.filesSharedWithMe(userId)
    res.status(HttpStatus.OK).json(sharedFiles)
  }

  @Get('folders/:userId')
  async foldersSharedWithMe(@Res() res: Response, @Query() query: { folderId: string }, @Param() params: { userId: string }) {
    const { folderId } = query
    const { userId } = params
    const sharedFolders = await this.shareFilesService.foldersSharedWithMe(userId, folderId)

    res.status(HttpStatus.OK).json(sharedFolders)
  }


  @Get('users')
  async fetchUsers(@Res() res:Response,@Query() query:{searchText:string}){
    const {searchText} = query
    const users= await this.shareFilesService.fetchUsers(searchText)
    res.status(200).json(users)
  }
}
