const ConversationModel  = require("../models/conversation.model");
const  MessageModel  = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;
    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if(!conversation){
        conversation=await ConversationModel.create({
            participants:[senderId,reciverId]
        })
    }

    const newMessage = new MessageModel({
      senderId: senderId,
      reciverId: reciverId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // SOCKET IO FUNCTIONALITY WILL GO HERE

    // this will work one by one
    // await conversation.save();
    // await newMessage.save();

    //this will run in parallel
    await Promise.all([conversation.save(),newMessage.save()])
    res.status(200).json({ newMessage });
  } catch (error) {
    console.log("error form signup ",error)
    res.status(500).json({error:error.message})
  }
};

exports.getMessage=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;

        const conversation=await ConversationModel.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages")  //NOT REFERENCE BUT ACTUAL MESSAGE
        
        if(!conversation)return res.status(200).json([]);
        const messages=conversation.messages;
        return res.status(200).json(messages)

    }catch(error){
        
        console.log("error form getMessage ",error)
        res.status(500).json({error:error.message})
    
    }
}
