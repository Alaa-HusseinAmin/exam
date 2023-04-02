import mongoose from "mongoose";
const photoSchema=mongoose.Schema({
    path:String,
    createdBy:{
         type:mongoose.Types.ObjectId,
         ref:"user"
    }
    },{timestamps:true})
export const photoModel = mongoose.model('photo',photoSchema)