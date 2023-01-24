const mongoose=require("mongoose");

const jobShcema=new mongoose.Schema({
   user_email:{
    type:String,
    required:true
   },
    Company_name:{
        type:String,
        required:true,
    },
    Position:{
        type:String,
        required:true,
    },
    Location:{
        type:String,
        required:true,
    },
    Contract:{
        type:String,
        enum:["Part Time","Full Time"],
        required:true
    }
},{timestamps:true,versionKey:false});

const jobModel=mongoose.model("job",jobShcema);

module.exports=jobModel