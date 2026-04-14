const express = require("express");
const jwt = require("jsonwebtoken");
const { authmiddleware } = require("./authmiddleware");
const app = express();
const port = 3000;
app.use(express.json());
const USERS = [];
const organizations = [];
app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const existinguser = USERS.find(user => user.username === username);
    if(existinguser){
        return res.status(400).json({message:"Username already exists pls siginin"});
    }
    USERS.push({
        id : USERS.length +1,
        username:username,
        password:password
    })
    return res.status(200).json({
        msg:"Signup successful",
        USERS:USERS
    })
})
app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const existinguser = USERS.find(user => user.username === username);
    if(!existinguser){
        return res.status(400).json({message:"pls signup first"});
    }
    if(existinguser.password !== password){
        return res.status(400).json({message:"invalid password"});
    }
    const token = jwt.sign({
        id : existinguser.id,
        
    },"secretkey")
    return res.status(200).json({
        msg:"Signin successful",
        token:token
    })
})
