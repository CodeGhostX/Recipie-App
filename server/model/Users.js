const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  savedRecipies:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"dishes"
    }
  ]
})

module.exports = mongoose.model('users',UserSchema);