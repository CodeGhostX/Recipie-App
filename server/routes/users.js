const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/Users');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req,res)=>{
  const {username, password} = req.body;
  const user = await UserModel.findOne({ username: username });
  if(user){
    return res.json("User already exists");
  }
  const hashed = await bcrypt.hash(password,10);
  const newUser = await UserModel.create({username, password:hashed});
  res.json({
    message: "User registered successfully",
    user: newUser
  });
});


router.post('/login', async (req,res)=>{
  const {username, password} = req.body;
  const user = await UserModel.findOne({username: username});
  if(user){
    const matched = await bcrypt.compare(password, user.password);
    if(matched){
      const token = jwt.sign({id: user._id},"secret");
      return res.json({token, userID: user._id,success:true});
    }
    else{
      return res.json("Password didn't match");
    }
  }
  else{
    return res.json({
      message: "User doesn't exists"
    });
  }
});

module.exports = router

