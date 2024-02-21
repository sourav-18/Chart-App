const  express = require("express")
const dotenv =require( "dotenv")
const connectToMongoDB = require("./db/connectToMongoDb.js")
const cookieParser = require("cookie-parser")

const messageRoutes=require("./routes/message.routes.js")
const  authRoutes = require( "./routes/auth.routes.js")
const  userRoutes = require( "./routes/user.routes.js")

dotenv.config()

const app=express()
const PORT=process.env.PORT||5000


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
app.use("/api",userRoutes)

app.listen(PORT,(err)=>{
    connectToMongoDB()
    if(err){
        console.log('Error form connecting server');
    }else{
        console.log('server running successfully',PORT);
    }
})