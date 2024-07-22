import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
//Register a user 
const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All Fields are Mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error ("User Already Registered");
    }
    const hashedPassword = await bcrypt.hash(password,3);
    const user = await User.create({
        username,
        email,
        password : hashedPassword,
    });
    console.log(user);
    if(user){
        res.status(201).json({id:user.id,name:user.username,email:user.email});
    }else{
        res.status(400);
        throw new Error("User Data is Invalid");
    }
});
//Login users public
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are Mandatory!");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user :{
                id : user.id,
                username : user.username,
                email : user.email,     
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "15m"}
    );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("OOPS!!..Invalid Credentials!!");
    }
});
//Current user private
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});

export {registerUser,loginUser,currentUser};