const User = require("../models/user.model");

exports.getUsersForSidebar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select({password:0,__v:0})
        res.status(200).json(filteredUsers);

    }catch(error){
        console.log("Error in getUsersForSlidebar: ",error.message)
        return res.status(500).json({error:error.message})
    }
}