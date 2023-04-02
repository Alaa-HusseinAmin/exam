import express from "express";
import { userAuth } from "../../middelware/auth.js";
import { validation } from "../../middelware/validation.js";

import * as usercontroller from './user.controller.js';
import { DeleteSchema, signInSchema, signUpSchema, UpdateSchema } from "./user.validation.js";
const userRouter = express.Router();


userRouter.post("/signUp",validation(signUpSchema),usercontroller.signUp);
userRouter.post("/signIn",validation(signInSchema),usercontroller.signIn);
userRouter.get("/verify/:token",usercontroller.verify);
userRouter.put("/",validation(UpdateSchema),userAuth,usercontroller.Updateuser);
userRouter.delete("/",userAuth,validation(DeleteSchema),usercontroller.Deletuser);
userRouter.patch("/forgetPassword",usercontroller.forgetPassword)
userRouter.patch("/resetPassword",usercontroller.resetPassword)
userRouter.get("/Logout",usercontroller.Logout)



export default userRouter;
