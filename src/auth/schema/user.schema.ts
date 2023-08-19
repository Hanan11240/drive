import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    email:String,
    name:String,
    password:String,
    AllocatedSpace:{type:Number,default:1024},
})