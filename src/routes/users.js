const express = require('express');
const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt")
const userModel = require('../models/Users')

const router = express.Router()

router.post('/register', async (req, res)=>{
    const {username, password} = req.body

    const user = await userModel.findOne({username});

    if(user){
        return res.json({message: 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new userModel({username,password: hashedPassword})
    await newUser.save()

    res.json({  message:"User added"});
})

router.post('/login', async (req, res)=>{
    const {username, password} = req.body

    const user = await userModel.findOne({username});

    if(!user){
        return res.json({message: 'User does not exists'})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.json({message: 'Username or Password incorrect'})
    }

    const token = jwt.sign({id:user._id}, "secret")
    res.json({token, userID: user._id})
})


module.exports = router