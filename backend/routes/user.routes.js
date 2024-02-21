const  express = require("express")
const userController = require("../controllers/user.controller")
const router=express.Router();
const protectRoute = require("../middleware/protectRoute");
router.get("/users",protectRoute, userController.getUsersForSidebar)
module.exports= router