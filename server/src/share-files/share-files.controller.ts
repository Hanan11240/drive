import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ShareFilesService } from './share-files.service';
import { ShareFilesDto } from './dto/shareFiles.dto';
import { Response } from 'express'

@Controller('share-files')
export class ShareFilesController {
  constructor(private readonly shareFilesService: ShareFilesService) {
  }


  @Post()
  async shareFilesWithUser(@Body() body: ShareFilesDto, @Res() res: Response): Promise<void> {
    await this.shareFilesService.shareFiles(body)
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
}
