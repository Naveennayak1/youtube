const express = require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User= require('../models/User');
const JWT_SECRET =process.env.JWT_SECRET;


if(!JWT_SECRET){
    throw new Error('JWT_SECRET is not defined in environment variables');
}

router.post('/signup' , async (req,res)=>{
const {username , email , password , avatar}= req.body;

try{
    const existinguser = await User.findOne({email});
    if(existinguser) return res.status(400).json({message :"user already exist"});

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser= new User({

        username,
        email,
        password:hashedpassword,
        avatar,
    });

    await newUser.save();

    res.status(201).json({message : "user registerd successfully"});
}
catch(err){
    res.status(500).json({message : "server error" , error:err.message});
}



});

router.post('/login' , async(req,res)=>{
    const {email ,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message : "invalid credintials"});


        const isMatch= await bcrypt.compare(password, user.password);
if(!isMatch) return res.status(400).json({message : "invalid creds"})

    const payload ={
        UserId : user._id,
        username: user.username,
        email : user.email,
    };

    const token = jwt.sign(payload , JWT_SECRET , {expiresIn : '1d' });

    res.json({ token, username: user.username, userId: user._id });
    }

    catch (err){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
})

module.exports = router;