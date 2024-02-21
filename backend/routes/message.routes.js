const messageController =require( "../controllers/message.controller")

const express=require("express");
const protectRoute = require("../middleware/protectRoute");
const router=express.Router();
router.post("/send/:id",protectRoute, messageController.sendMessage)
router.get("/:id",protectRoute, messageController.getMessage)
module.exports=router