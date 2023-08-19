import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FolderModel } from './dto/folder..dto';

@Injectable()
export class FoldersService {

    constructor(@InjectModel('folders') private folderModelDto:Model<FolderModel>){
    }

    
}
