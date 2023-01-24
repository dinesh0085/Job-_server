const userModel=require("../Model/user.model");
const express=require("express");
const jwt=require("jsonwebtoken")
const secretKey=process.env.SECRET_KEY

const app=express.Router();

app.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    const x=email.split("@").map(String)
    try{
     if(x[1]==="masaischool.com"){
      const user=new userModel({name,email,password,type:"Admin"})
      await user.save();
      res.send({msg:"User registration successfull",user})
     }else{
        const user=new userModel({name,email,password,type:"User"})
        await user.save();
        res.send({msg:"User registration successfull",user})
     }
    }catch(e){
        res.status(400).send({msg:"User registration failed",error:e.message})
    }
   
})

app.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email,password})

    try{
     if(user){
        const token=jwt.sign({id:user._id,name:user.name,email:user.email,type:user.type},secretKey,{
            expiresIn:"1 day"
        })
      res.send({msg:"User login successfull",user,token})
     }else{
        res.send({msg:"User login failed",error:"User not found"})
     }
    }catch(e){
        res.status(400).send({msg:"User login failed",error:e.message})
    }
   
})

module.exports=app