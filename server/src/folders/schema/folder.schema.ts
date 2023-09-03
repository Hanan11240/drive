import mongoose from "mongoose";


export const  FolderSchema= new mongoose.Schema({
        folderName:String,
        fileIds:[{fileId:mongoose.Schema.Types.ObjectId,fileName:{type:String,default:null}}],
        parentFolderId:{type:mongoose.Schema.Types.ObjectId,default:null},
        childNumber:{type:Number,default:0},
        userId:{type:mongoose.Schema.Types.ObjectId,default:null},
})