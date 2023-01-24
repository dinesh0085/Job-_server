const jobModel=require("../Model/job.model");
const express=require("express");
const jwt=require("jsonwebtoken");
const secretKey=process.env.SECRET_KEY;

const app=express.Router();

app.post("/create",async(req,res)=>{
    const {Company_name,Position,Location,Contract}=req.body;
     const token=req.headers["authorization"];
    
    const x=Contract.toUpperCase();
    try{
     if(token){
        const verify=jwt.verify(token,secretKey)

        if(x==="FULL TIME" || x==="FULLTIME"){
            const job=new jobModel({user_email:verify.email,Company_name,Position,Location,Contract:"Full Time"})
            await job.save();
            res.send({msg:"Job Added Successfully",job})
           }else if(x==="PART TIME" || x==="PARTTIME"){
              const job=new jobModel({user_email:verify.email,Company_name,Position,Location,Contract:"Part Time"})
              await job.save();
              res.send({msg:"Job Added Successfully",job})
           }else{
              res.send({msg:"Job Adding faled",error:"Contract should be Part Time or Full Time"})
           }
     }else{
           res.send({msg:"Job Adding faled",error:"You are not allowed to do this operation"})
     }
    
    }catch(e){
        res.status(400).send({msg:"Job Adding faled",error:e.message})
    }
   
})

app.delete("/delete/:id",async(req,res)=>{
     const {id}=req.params
     const token=req.headers["authorization"];
     
    //  console.log(id);
    //  console.log(job);
    //  console.log(token);
    try{
     const job=await jobModel.findById(id);

     if(job){
        if(token){
            const verify=jwt.verify(token,secretKey)
    
            if(verify.email===job.user_email){
                const delete_job=await jobModel.findByIdAndDelete(id)
                res.send({msg:"Job Deleted Successfully",delete_job})
               }else{
                  res.send({msg:"Job deleting failed",error:"You are not allowed to delete this job"})
               }
         }else{
               res.send({msg:"Job deleting failed",error:"Authentication failed"})
         }
     }else{
        res.send({msg:"Job deleting failed",error:"Job not found for this id"})
     }
    
     
    
    }catch(e){
        res.status(400).send({msg:"Job Adding failed",error:e.message})
    }
   
})

// app.put("/edit/:id",async(req,res)=>{
//     const {Company_name,Position,Location,Contract}=req.body;
//     const {id}=req.params
//     const token=req.headers["authorization"];
//     const x=Contract.toUpperCase();

//    //  console.log(id);
//    //  console.log(job);
//    //  console.log(token);
//    try{
//     const job=await jobModel.findById(id);

//     if(job){
//         console.log("yes1")
//        if(token){
//         console.log("yes2")
//            const verify=jwt.verify(token,secretKey)
   
//            if(verify.email===job.user_email){
//             console.log("yes3")
               
//             if(x==="FULL TIME" || x==="FULLTIME"){
//                 console.log("yes4")
//                 const updated_job=jobModel.findByIdAndUpdate(verify.id,{user_email:verify.email,Company_name,Position,Location,Contract:"Full Time"})
//                 res.send({msg:"Job updated Successfully",updated_job})
//                }else if(x==="PART TIME" || x==="PARTTIME"){
//                   const updated_job=jobModel(verify.id,{user_email:verify.email,Company_name,Position,Location,Contract:"Part Time"})
//                   res.send({msg:"Job updated Successfully",updated_job})
//                }else{
//                   res.send({msg:"Job updating failed1",error:"Contract should be Part Time or Full Time"})
//                }
//          }else{
//                res.send({msg:"Job updating failed2",error:"You are not allowed to do this operation"})
//          }

//           }else{
//                  res.send({msg:"Job updating failed3",error:"You are not allowed to delete this job"})
//               }
//         }else{
//               res.send({msg:"Job updating failed4",error:"Authentication failed"})
//         }
    
//    }catch(e){
//        res.status(400).send({msg:"Job updating failed5",error:e.message})
//    }
  
// })


app.get("/",async(req,res)=>{
    const job=await jobModel.find()
    try{
        res.send({msg:"Job Getting Successfull",job})
    }catch(e){
        res.send({msg:"Something went wrong",error:e.message});
    }
})

app.get("/admin",async(req,res)=>{
    const token=req.headers["authorization"];

    try{
        if(token){
            const verify=jwt.verify(token,secretKey);
            if(verify){
                const job=await jobModel.find({user_email:verify.email})
                res.send({msg:"Job getting successfull",job})
            }else{
                res.send({msg:"Token is not valid"})
            }
        }else{
            res.send({msg:"Token is not found"}) 
        }
    }catch(e){
        res.send({msg:"Something went wrong",error:e.message});
    }
})



module.exports=app