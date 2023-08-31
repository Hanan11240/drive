import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    email:String,
    name:String,
    password:String,
    AllocatedSpace:{type:Number,default:1073741824}, //in bytes 1Gb
    fileIds:[{fileId:mongoose.Schema.Types.ObjectId,isParent:Boolean}],
    spaceConsumed:{type:Number,default:0},
    folderNestLimit:{type:Number,default:10}
})