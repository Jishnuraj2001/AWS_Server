const express=require("express");
const userRouter=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const{Usermodel}=require("../models/user.model");

userRouter.post("/signup",async(req,res)=>{
    const{name,email,password}=req.body;
    try {
        const user=await Usermodel.findOne({
            where:{
                email
            }
        })
        if(user==null){
            bcrypt.hash(password,6,async(err, hash)=>{
                if(hash){
                    await Usermodel.create({name,email,password:hash});
                    res.send("sginup successful");
                }else{
                    console.log(err.message);
                    res.send("unable to signup");
                }
            });
        }else{
            res.send("already registered");
        }
    } catch (error) {
        console.log(error.message);
        res.send("unable tp register");
    }
})


userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await Usermodel.findOne({
            where:{
                email
            }
        })
        if(user!=null){
            bcrypt.compare(password,user.password,async(err, result)=>{
                if(result == true){
                    console.log(user.id);
                    const token = jwt.sign({ userID:user.id },process.env.key);
                    res.send({"msg":"login successful","token":token});
                }else{
                    res.send("Wrong credentials");
                }
            });
        }else{
            res.send("please signup first!");
        }
    } catch (error) {
        console.log(error.message);
        res.send("unable to login");
    }
})




module.exports={
    userRouter
}