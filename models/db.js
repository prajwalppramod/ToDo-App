const mongoose = require('mongoose')

require('dotenv').config();
require('./toDoModel.js')



mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("The db is connected"))
.catch((err)=>console.log(err));

