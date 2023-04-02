import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { userModel } from "../../../database/model/usermodel.js";
import { sendMail } from "../../email/user.emails.js";
import { catchAsyncErr } from "../../utils/catchErr.js";

export const signUp = catchAsyncErr(async (req, res) => {
  const { name, email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
   return next(new AppErr('email already in use',400))
  } else {
    let hash = bcrypt.hashSync(password, 8);
    await userModel.insertMany({
      name,
      email,
      password: hash,
    });
    res.json({ message: "success" });
    sendMail({ email });
  }
});



export const signIn = catchAsyncErr(async (req, res) => {
  const { _id, email, name, password } = req.body;
  let isFound = await userModel.findOne({ email });
  if (isFound) {
    const match = await bcrypt.compare(password, isFound.password);

    if (match) {
      let token = jwt.sign(
        {
          name: isFound.name,
          userId: isFound._id,
          email: isFound.email,
          role: isFound.role,
        },
        "alaa"
      );
      res.json({ message: "login", token });
    } else {
     return next(new AppErr('password incorrect',404))
    }
  } else {
    return next(new AppErr('Account not found"',404))
  }
});




export const Updateuser = catchAsyncErr(async (req, res) => {
  const { _id: id}=req.user;
  const {email, name, password} = req.body;
  let isFound = await userModel.findOne({ email });
  if (isFound) {
    let user = await userModel.findByIdAndUpdate(
      { _id: id },
      { name, email,password },
      { new: true }
    );
    res.json({ message: "success", user });
  } else {
    return next(new AppErr('Account not found',404))
  }
});



export const Deletuser = catchAsyncErr(async (req, res) => {
  const { _id: id } = req.user;
  let isFound = await userModel.findOne({ _id: id });
  if (isFound) {
    await userModel.findByIdAndDelete({ _id: id });
    res.json({ message: "success" });
  } else {
  return next(new AppErr('Account not found',404))
  }
});



export const verify = catchAsyncErr(async (req, res) => {
  let { token } = req.params;
  jwt.verify(token, "email", async function (err, decoded) {
    if (!err) {
      await userModel.findOneAndUpdate(
        { email: decoded.email },
        { confirmedEmail: true }
      );
      res.json({ message: "verified" });
    } else {
  return next(new AppErr(err,401))
    }
  });
});


export const forgetPassword =catchAsyncErr(async(req,res)=>{
  const {email} = req.body;
  const code=uuidv4()
  const user = await userModel.findOneAndUpdate({email},{code})
  sendMail(email,'forget password',`<h1>code :<span>${code}</span></h1>`)
  return user ? res.json({message:"please check email"}):res.json({message:"not exit"})
}) 


export const resetPassword=catchAsyncErr(async(req,res)=>{
  const {email,code,password}=req.body
  const user = await userModel.findOne({email})
  // console.log(user)
  if(user.code == code){
    let hash = bcrypt.hashSync(password, 8);
  const user = await userModel.findOneAndUpdate({email},{code:null,password:hash})
  return res.json({message:"done",user})
}
return res.json({message:"code invalid"})
})


//logout err
// export const Logout=catchAsyncErr(async(res,req)=>{
//     const {_id:id}=req.user
//     let isFound = await userModel.findOne({ _id: id });
//     if (isFound) {
//       await userModel.findByIdAndDelete({ _id: id });
//       res.json({ message: "success User Deleted" });
//     } else {
//     return next(new AppErr('Account not found',404))
//   }})
  
export const Logout=catchAsyncErr(async(req,res)=>{
  const { _id: id } = req.user;
    let isFound = await userModel.findOne({ _id: id });
    if (isFound) {
      res.clearCookie('remember_me');
      req.logout();
      res.redirect('/');
    //   req.logout
    //  req.session.destroy();
      res.status(200).json({ message: "success"});
    } else {
    return next(new AppErr('Account not found',404))
}})



    