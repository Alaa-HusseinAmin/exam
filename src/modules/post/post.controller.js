import { postModel } from "../../../database/model/postmodel.js";

import { catchAsyncErr } from "../../utils/catchErr.js";


export const addPost = catchAsyncErr(async (req, res) => {
    const { id } = req.body;
    let user = await userModel.findOne({ id });
    if (user) {
      await postModel.insertMany({
        post
      });
      res.json({ message: "success" });
    } else {
      return next(new AppErr('user not found',400))
    }
  });

export const getpost =catchAsyncErr(async (req, res) => {
    const { _id } = req.body
        let posts = await postModel.findById({_id});
        res.json({ message: "success", posts });
  }) 
  
  export const getAllposts =catchAsyncErr( async (req, res) => {
    let posts = await postModel.find({}).populate('addedBy')
    res.json({ message: "success",posts })
    }
  )
 
  export const Updatepost = catchAsyncErr(async (req, res) => {
    const { _id: id}=req.user;
    const {email, post } = req.body;
    let isFound = await postModel.findOne({ email });
    if (isFound) {
      let posts = await postModel.findByIdAndUpdate(
        { _id: id },
        { post },
        { new: true }
      );
      res.json({ message: "success",posts });
    } else {
      return next(new AppErr('Account not found',404))
    }
  });
  

  export const Deletpost = catchAsyncErr(async (req, res) => {
    const { _id: id,email } = req.user;
    let isFound = await postModel.findOne({ _id: id,email });
    if (isFound) {
      await postModel.findByIdAndDelete({ _id: id });
      res.json({ message: "success" });
    } else {
    return next(new AppErr('Account not found',404))
    }
  });
    
  export const addComment = catchAsyncErr (async(req,res)=>{
  comment = new Comment(req.body);
    comment.save(function (err, savedComment) {
    if (err) throw err;
    res.json({
    "id": savedComment._id
    }); 
    }
  )}
  )

  export const Deletecomment = catchAsyncErr(async(req,res)=>{
    const { _id: id,comment,email } = req.user;
    let isFound = await postModel.findOne({ _id: id ,email});
    if (isFound) {
      await postModel.findByIdAndDelete({ _id: id,comment });
      res.json({ message: "success" });
    } else {
    return next(new AppErr('comment not found',404))
    }
  })

  export const like = catchAsyncErr(async(req,res)=>{
    const {postId,userId}=req.body
    let post = await postModel.findByIdAndUpdate(postId,{
      $addToSet:{like:[userId]},
      $pull:{dislike:[userId]}
    },{new:true})
    post.like=post.like.length-post.dislike.length
    await post.save()
    res.json(post)
  })

  export const dislike = catchAsyncErr(async(req,res)=>{
    const {postId,userId}=req.body
    let post = await postModel.findByIdAndUpdate(postId,{
      $addToSet:{dislike:[userId]},
      $pull:{like:[userId]}
    },{new:true})
    post.like=post.like.length-post.dislike.length
    await post.save()
    res.json(post)
  })
  
  export const getpublicposts =catchAsyncErr(async (req, res) => {
    const { _id:id} = req.body
        let posts = await postModel.findById({_id:id,visibility:"public"});
        res.json({ message: "success", posts });
  }) 

  export const getprivateposts =catchAsyncErr(async (req, res) => {
    const { _id:id } = req.body
        let posts = await postModel.findById({_id:id,visibility:"private"});
        res.json({ message: "success", posts });
  }) 
  