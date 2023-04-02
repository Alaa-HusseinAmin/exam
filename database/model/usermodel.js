import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        minLength:[2,'name too short'],
        maxLength:[15,'name too long'],
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minLength:[2,'password too short'],
        required:true,
    },
    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      code:String,
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    },{timestamps:true})
export const userModel = mongoose.model('user',userSchema)