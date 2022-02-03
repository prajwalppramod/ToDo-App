const mongoose = require('mongoose')

require('./toDoModel.js')

mongoose.connect('mongodb://127.0.0.1:27017/ToDo',{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("The db is connected"))
.catch((err)=>console.log(err));

