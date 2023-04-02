import express from "express"
import { fileUpload } from "../../utils/fileUpload.js"
import { addphoto } from "./photo.controller.js"

const photoRouter=express.Router()

photoRouter.post("/",fileUpload('path'),addphoto)

export default photoRouter