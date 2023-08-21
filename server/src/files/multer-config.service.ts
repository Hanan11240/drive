import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { FilesService } from './files.service';
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  private gridFsStorage: typeof GridFsStorage;

  constructor(configService: ConfigService ) {
    this.gridFsStorage = new GridFsStorage({
      url: configService.get<string>('MONGODB_URI'),
      file: async (req, file) => {
        if (req.headers['content-length'] > 1024 * 1024) {
          throw new HttpException('File size exceeded', HttpStatus.BAD_REQUEST);
        }
        // const limitExausted = await this.fileService.userExhaustedSapceLimit(
        //   req.param,
        //   req.headers['content-length'],
        // );
        // if (limitExausted)
        //   throw new HttpException('Limit exhausted', HttpStatus.BAD_REQUEST);
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename,
          };
          resolve(fileInfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
