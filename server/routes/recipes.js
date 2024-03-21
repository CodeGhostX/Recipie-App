const RecipieModel = require('../model/Recipies');
const UserModel = require('../model/Users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/getAllRecipie', async (req, res)=>{
  try {
    const response = await RecipieModel.find();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
})

router.post('/create', async (req, res)=>{
  try {
    const newRecipie = await RecipieModel.create(req.body);
    res.json(newRecipie);
  } catch (err) {
    res.json(err);
  }
})

router.post('/save', async (req, res)=>{
  try {
    const recipie = await RecipieModel.findById(req.body.recipieID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipies.push(recipie);
    await user.save();
    res.json({ savedRecipies });
  } catch (err) {
    res.json(err);
  }
})

router.get('/getSavedRecipies/:userID', async (req,res)=>{
  try {
    const user = await UserModel.findById(req.params.userID).populate('savedRecipies');
    const savedRecipies = await RecipieModel.find({
      _id: { $in:user.savedRecipies }
    });
    res.json({ savedRecipies: user?.savedRecipies });
  } catch (error) {
    res.json(error);
  }
})

module.exports = router