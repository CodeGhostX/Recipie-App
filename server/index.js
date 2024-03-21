const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/users.js');
const recipieRouter  = require('./routes/recipes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);
app.use('/recipies', recipieRouter);

mongoose.connect("mongodb+srv://abhishekinfinite360:mFEGuJES0dRfJEae@cluster0.fjnahbn.mongodb.net/Recipie?retryWrites=true&w=majority");

const db = mongoose.connection;
db.once('open',()=>console.log("Database is connected"));

app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
})

