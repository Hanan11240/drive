import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    email:String,
    name:String,
    password:String,
    AllocatedSpace:{type:Number,default:1073741824}, //in bytes 1Gb
    fileIds:[mongoose.Schema.Types.ObjectId],
    // folderIds:[mongoose.Schema.Types.ObjectId],
    spaceConsumed:{type:Number,default:0},
    folderNestLimit:{type:Number,default:10}
})