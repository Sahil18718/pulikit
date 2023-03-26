
const express=require("express")
const  userRouter=express.Router()
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
// instal jsonwebtoken


// registration
userRouter.post("/register",async(req,res)=>{
    const {email,pass,location,age}=req.body
    try {
        bcrypt.hash(pass, 5, async(err, hash) =>{
            const user=new UserModel({email,pass:hash,location,age})
            await user.save()
            res.status(200).send({"msg":"Registration has been  Sucessful"})
        });
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    // res.send("login has been done")
})


// login
userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user= await UserModel.find({email})
        if(user){
            bcrypt.compare(pass, user[0].pass, (err, result) =>{
                if(result){
                    res.status(200).send({"msg":"login successfull","token":jwt.sign({"userID":user[0]._id},"masai")})
                }else{
                    res.status(400).send({"msg":"login Unsuccessfull"})

                }
            }); 
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

// login details and checking token 
// after registration for login we will give a token to authenticate
userRouter.get("/details",(req,res)=>{
    const token=req.headers.authorization
    jwt.verify(token,'bruce',(err,decoded)=>{
        decoded?res.status(200).send("User Details"):res.status(400).send({"msg":err.message})
    })
   
})

// 

module.exports={
    userRouter
}