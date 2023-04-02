import express from "express";
import { userAuth } from "../../middelware/auth.js";
import { validation } from "../../middelware/validation.js";

import * as postcontroller from './post.controller.js';
import { addcommentSchema, addPostSchema, deletecommentSchema, DeleteSchema, dislikeSchema, getpostSchema, likeSchema, privateSchema, publicSchema, UpdateSchema } from "./post.validation.js";
const postRouter = express.Router();



postRouter.post("/",validation(addPostSchema),postcontroller.addPost);
postRouter.put("/",validation(UpdateSchema),userAuth,postcontroller.Updatepost);
postRouter.delete("/",userAuth,validation(DeleteSchema),postcontroller.Deletpost);
postRouter.get("/",validation(getpostSchema),postcontroller.getpost)
postRouter.get("/",postcontroller.getAllposts)
postRouter.post("/addcomment",validation(addcommentSchema),postcontroller.addComment)
postRouter.delete("/",validation(deletecommentSchema),postcontroller.Deletecomment)
postRouter.patch('/like',validation(likeSchema),postcontroller.like)
postRouter.patch("/dislike",validation(dislikeSchema),postcontroller.dislike)
postRouter.get("/publicposts",validation(publicSchema),postcontroller.getpublicposts)
postRouter.get("/privateposts",validation(privateSchema),postcontroller.getprivateposts)
export default postRouter;
  