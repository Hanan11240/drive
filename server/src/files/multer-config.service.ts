import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    private gridFsStorage: typeof GridFsStorage;
    constructor(configService:ConfigService) {
        this.gridFsStorage = new GridFsStorage({
            url:configService.get<string>('MONGODB_URI') ,
            file: (req, file) => {
                if (req.headers['content-length'] > 1024 *1024 ) { // 1 MB in bytes
                    throw new HttpException('File size exceeded',HttpStatus.BAD_REQUEST);
                  }
                return new Promise((resolve, reject) => {
                    console.log(file)
                    const filename = file.originalname.trim();
                    const fileInfo = {
                      filename: filename
                    };
                    resolve(fileInfo);
                });
              }
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}