const {Schema, model} = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const toDoSchema = new Schema({
    taskName:{
        type:String,
        required:true
    },
    taskDesc:{
        type:String,
        required:true
    }
})

toDoModel = model('todo', toDoSchema)

