const jwt =require("jsonwebtoken");
const User = require("../models/user.model");
const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(400).json({eror:"Unauthorized - No Token Provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid Token "})
        }
        const user=await User.findById(decoded.userId).select({password:0})
        req.user=user;
        next()
    }catch(error){
        console.log('error from protectRote',error);
        res.status(500).json({error:"Internal sever error"})
    }
}
module.exports=protectRoute;