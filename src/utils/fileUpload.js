import multer from "multer";
import { v4 as uuidv4 } from "uuid";
export const fileUpload=(filedName)=>{    
const storage=multer.diskStorage({
    destination:(res,file,cb)=>{
      cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
      console.log(file)
      cb(null,uuidv4()+"-"+file.originalname)
    }
  })
  
  const upload=multer({storage})
  return upload.single(filedName)
}