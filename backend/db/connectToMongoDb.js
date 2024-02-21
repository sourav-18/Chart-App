const mongoose=require("mongoose")
const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log('Connected to MongoDB');
    }catch(error){
        console.log("error from connection to MongoDB",error.message);
}
    }
module.exports=connectToMongoDB;