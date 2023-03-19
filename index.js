const express=require("express");
const app=express();
app.use(express.json());

const{userRouter}=require("./routes/user.router");

app.get("/",(req,res)=>{
    res.send("Haii ,Welcome to SERVER2");
})

app.use("/user",userRouter);

app.listen(4500,()=>{
    console.log("server is running at port 4500");
})