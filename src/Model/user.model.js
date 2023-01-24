const mongoose=require("mongoose");

const userShcema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        enum:["Admin","User"],
        required:true
    }
},{timestamps:true,versionKey:false});

const userModel=mongoose.model("user",userShcema);

module.exports=userModel