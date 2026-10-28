import { User } from "../models/userSchema.js";
import ErrorHandler from "../middleware/errorMidleware.js";
import {catchAsyncError} from "../middleware/catchAsyncError.js";
import {generateToken} from "../utils/generateToken.js";

export const registerUser =  catchAsyncError(async (req,res,next) =>{
    const {name,email,password,role} = req.body;
    
    if(!name||!email||!password||!role){
        return next(new ErrorHandler("Please enter all fields",400));
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return next(new ErrorHandler("User already exists",400));
    }
    const user = await User.create({
        name,
        email,
        password,
        role
    })

     generateToken(user, "User Registered", 200, res);
})

export const loginUser = catchAsyncError(async (req,res,next) =>{
    const {email,password,} = req.body;
   if(!email||!password){
    return next(new ErrorHandler("Please enter all fields",400));
   }

   const user = await User.findOne({email}).select("+password");
   if(!user){
    return next(new ErrorHandler("Invalid email or password",401));
   }

   const isPasswordMatched = await user.comparePassword(password);
   if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid email or password",401));
   }
   generateToken(user, "User Logged In", 200, res);
})

export const getMyProfile = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User logged out successfully",
    });
});