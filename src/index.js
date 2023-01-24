const express=require('express');
require("dotenv").config();
const PORT=process.env.PORT;
const connect=require('./Database/dbCnnect')
const userRouter=require("./Routes/user.route")
const jobRouter=require("./Routes/job.route")

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req,res)=>{
 return res.send('Hello')
})

app.use("/user",userRouter)
app.use("/job",jobRouter)

app.listen(PORT,async()=>{
    try{
      await connect()
      console.log("Database connected");
    }catch(e){
      console.log(e.message);
    }
    console.log('Listening Server')})