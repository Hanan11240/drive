import mongoose from "mongoose";

export const  ShareFilesSchema= new mongoose.Schema({
        
        ownerId:mongoose.Schema.Types.ObjectId,
        sharedWith:[String],
        hasExpiry:{type:Boolean,default:false},
        expiryDate:Number,
        folderId:mongoose.Schema.Types.ObjectId,
        fileId:mongoose.Schema.Types.ObjectId

})