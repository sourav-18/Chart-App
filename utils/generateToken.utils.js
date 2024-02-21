const jwt =require("jsonwebtoken")

exports.generateTokenAndSetCookie=(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000, //MS
        httpOnly:true, //prevent xss attacks cross-site scripting attacks
        sameSite:"strict", //CSF atacks cross-site requies forgery attacks
        secure:process.env.NODE_ENV==="development"?false:true
    })
}