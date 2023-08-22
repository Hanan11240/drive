import mongoose from "mongoose";


export const  FolderSchema= new mongoose.Schema({
        folderName:String,
        fileIds:[mongoose.Schema.Types.ObjectId],
        parentFolderId:{type:mongoose.Schema.Types.ObjectId,default:null},
        childNumber:{type:Number,default:0},
        userId:{type:mongoose.Schema.Types.ObjectId,default:null},
})