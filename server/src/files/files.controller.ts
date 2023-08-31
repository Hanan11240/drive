import { Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileResponseVm } from './model/file-response-vm.model';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  
  @Post(':userId')
  @UseInterceptors(FilesInterceptor('file'))
 async upload(@UploadedFiles() files,@Param() param:{userId:string},@Query() query:{folderId:string}): Promise<any[]> {
    const  {userId} = param
    const {folderId} = query
      const response = [];
      files.forEach(file => {
          const fileReponse = {
              originalname: file.originalname,
              encoding: file.encoding,
              mimetype: file.mimetype,
              id: file.id,
              filename: file.filename,
              metadata: file.metadata,
              bucketName: file.bucketName,
              chunkSize: file.chunkSize,
              size: file.size,
              md5: file.md5,
              uploadDate: file.uploadDate,
              contentType: file.contentType,
          };
         
          response.push(fileReponse);
      });
      await this.filesService.userInfoToFile(userId,files,folderId)
      return response;
  }
  @Get('info/:id')
  async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {     
      const file = await this.filesService.findInfo(id)
      const filestream = await this.filesService.readStream(id)
      if(!filestream){
          throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED)
      }
      return {
          message: 'File has been detected',
          file: file
      }
  }

  @Get(':id')
  
  async getFile(@Param('id') id: string, @Res() res) {        
      const file = await this.filesService.findInfo(id)
      const filestream = await this.filesService.readStream(id)
      if(!filestream){
          throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
      }
      res.header('Content-Type', file.contentType);
      return filestream.pipe(res)
  }

  @Get('download/:id')
 
    async downloadFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)        
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        } 
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res) 
    }
    @Delete('delete/:id/:userId')
    async deleteFile(@Param()  param:{userId:string,id:string}): Promise<FileResponseVm> {
        const {id,userId} = param
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.deleteFile(id)
        if(!filestream){
            throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED)
        }      
        await this.filesService.updateUserConsumedSpace(userId,file,id)  
        return {
            message: 'File has been deleted',
            file: file
        }
    }
    @Get('parent-files/:userId')
    async parentFiles(@Param() param:{userId:string},@Res() res:Response):Promise<void>{
      const {userId} = param
      const parentFolders = await this.filesService.parentFiles(userId);
      res.status(HttpStatus.OK).json(parentFolders)
  
    }
}
