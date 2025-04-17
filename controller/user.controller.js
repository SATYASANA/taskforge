import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import cloudinary from 'cloudinary'
import { generateJWTToken } from "../config/jwtToken.js";


export const registerUser = async (req,res,next)=>{
   try {
    const {userName,email,password} = req.body;

    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({
            success:false,
            message:'User already exist'
        })
    }
    const genSalt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password,genSalt)

    const user  = new User({
        userName,
        password:hashPassword,
        email,
        profilePic:{
            public_id:email,
            secure_url:'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
        }

    })
    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width:250,
                height:250,
                crop:'fill',
                gravity:'faces'
            })
            if(result){
                user.profilePic.public_id = result.public_id,
                user.profilePic.secure_url = result.secure_url

            }
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:error.message
            })
        }
    }
    await user.save();
    try {
        generateJWTToken(user._id,user.role,res)
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error
        })
    }
return res.status(200).json({
    success:true,
    message:"user logged in successfully",
    role:verifyUser.role
})
   } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
   }

}

export const loginUser = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
    console.log("email is",email)
    const verifyUser = await User.findOne({email});
    if(!verifyUser){
        return res.status(401).json({
            success:false,
            message:"Email id doesnot exist"
        })
    }
    const comparePassword = await bcrypt.compare(password,verifyUser.password)
    if(comparePassword){
        try {
            generateJWTToken(verifyUser._id,verifyUser.role,res

            );

        } catch (error) {
            return res.status(400).json({
                success:false,
                message:error.message
            })
        }
    }
   
    return res.status(200).json({
        success:true,
        message:'user logged in success fully',
        role: verifyUser.role,
    })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const logoutUser = async (req,res,next)=>{
   try {
    res.cookie('token',{
        secure:process.env.NODE_ENV!=='DEVELOPEMENT',
        httpOnly:true,
        maxAge:0,

    })
    return res.status(200).json({
        success:true,
        message:'user logged out successfully'
    })
   } catch (error) {
    return res.status(400).json({
        success:false,
        message:error
    })
   }
}

export const getCurrentUser = async (req,res,next)=>{
    try {
        const {userId,role} = req.user
        const userInfo = await User.findById(userId);
        if(!userInfo){
            return res.status(400).json({
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            role,
            userInfo
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}