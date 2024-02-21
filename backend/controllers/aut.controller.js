const { generateTokenAndSetCookie } = require("../../utils/generateToken.utils");
const User = require("../models/user.model");
const bcrypt=require("bcryptjs")

exports.signup=async(req,res)=>{
    try{
        const {fullName,userName,password,confirmPassword,gender}=req.body;
        if(password!==confirmPassword){
            res.status(400).json({error:"password dont't match"})
        }
        const user=await User.findOne({userName}).select({userName});
        if(user){
           return res.status(400).json({error:"UserName already exists"})
        }

        //HASH PASSWORD HERE
        const slat=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,slat)

      const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${userName}`
      const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${userName}`
      const newUser=new User({
        fullName:fullName,
        userName:userName,
        password:hashedPassword,
        gender:gender,
        profilePic:gender==="male"?boyProfilePic:girlProfilePic
      })
      if(newUser){
    generateTokenAndSetCookie(newUser._id,res);
        await newUser.save()
        return  res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            userName:newUser.userName,
            profilePic:newUser.profilePic,
          })
      }else{
        res.status(400).json({error:"Invalid user data"})
      }

    }catch(error){
        console.log('error from signup');
        return res.status(500).json({error:error.message})
    }
}

exports.login=async(req,res)=>{
    try{
        const {userName,password}=req.body;
        const user=await User.findOne({userName});
        const issPasswordCorret=await bcrypt.compare(password,user?.password||" ");
        if(!user||! issPasswordCorret){
            return res.status(400).json({error:"Invalid username or password"})
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            userName:user.userName,
            profilePic:user.profilePic,
        })
    }catch(error){
        console.log('error from login');
        return res.status(500).json({error:error.message})
    }
}

exports.logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    }catch(error){
        console.log('error from logout');
        return res.status(500).json({error:error.message})
    }
}