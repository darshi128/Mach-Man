import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        minlength:[3,"Name should be greater than 3 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        validate:[validator.isEmail,"Please enter a valid email"],
    },
    password:{
        required:true,
        type:String,
        minlength:[8,"Password should be at least 8 characters long"],
        select:false,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Engineer","Operator"]
    }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

export const User = mongoose.model("User",userSchema);