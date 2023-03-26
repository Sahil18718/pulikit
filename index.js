const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/notes.routes")
const {auth}=require("./middleware/auth.middleware")
const cors=require("cors")
require("dotenv").config()


const app=express()
app.use(express.json())
app.use(cors())



app.use("/users",userRouter)
app.use(auth)
app.use("/notes",noteRouter)

app.listen(process.env.port,async ()=>{
    try {
        await connection 
        console.log("sever running")
    } catch (error) {
        console.log("sever Not running")
        console.log({"msg":"error.message"})
    }
    
})