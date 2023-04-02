import { photoModel } from "../../../database/model/photomodel.js";
import { catchAsyncErr } from "../../utils/catchErr.js";

export const addphoto= catchAsyncErr(async (req,res)=>{
   const {createdBy} = req.body

   await photoModel.insertMany({path:req.file.filename,createdBy})
   res.json({message:"success"})
}
)