import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ShareFilesService } from './share-files.service';
import { ShareFilesDto } from './dto/shareFiles.dto';
import {Response } from 'express'

@Controller('share-files')
export class ShareFilesController {
  constructor(private readonly shareFilesService: ShareFilesService) {
  }


  @Post()
  async shareFilesWithUser(@Body() body:ShareFilesDto,@Res() res:Response):Promise<void>{
    await this.shareFilesService.shareFiles(body)
    res.status(HttpStatus.OK).json({message:'success'})
  }

  @Get(':userId')
  async filesFoldersSharedWithMe(@Param() param:{userId:string},@Res() res:Response):Promise<void>{ 
        
  }
}
