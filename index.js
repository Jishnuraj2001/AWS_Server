const express=require("express");
const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Haii ,Welcome to SERVER2");
})

app.listen(4500,()=>{
    console.log("server is running at port 4500");
})