import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    post:{
        type:String,
    },
    content: String,
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  },
    like: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      dislike: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
    visibility: {
  type: String,
  enum : ["public", "private"],
  default: "public"
},
    },{timestamps:true})
export const postModel = mongoose.model('post',postSchema)