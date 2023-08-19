import mongoose from "mongoose";


export const  FolderSchema= new mongoose.Schema({
        folderName:String,
        fileIds:[mongoose.Schema.Types.ObjectId],
        parentFolderId:{trpe:mongoose.Schema.Types.ObjectId,default:null},
        folderIds:[mongoose.Schema.Types.ObjectId],
        childNumber:{type:Number,default:0}
})