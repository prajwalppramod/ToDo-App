const express = require("express");
const app = express();
const port = 3000;
const { engine } = require('express-handlebars');
var bodyParser = require('body-parser')

require("./models/db")

const {model} = require('mongoose');

const toDoModel = model('todo')



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json({ extended: true }))


app.engine('hbs', engine({extname:'.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    toDoModel.find({}).lean().exec(function(err, docs) {
        if(!err){
            res.render('homepage', {tasks: docs})
        }
        else{
            console.log(err);
            res.render('homepage')
        }
    });
});

app.post('/', (req, res)=>{
    addTask(req, res)
})

app.post('/delete/:id', (req, res)=>{
    deleteTask(req, res)
})

app.post('/edit/:id', (req, res)=>{
    toDoModel.findById(req.params.id, function (err, doc) {
        if(!err){
            res.render('edit',{task: doc.toJSON()})
        }
        else{
            console.log(err)
            res.redirect('/')
        }
    })
})

app.post('/edit/:id/save', (req, res)=>{
    editTask(req, res)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// Functions
function addTask(req, res) {
    console.log(req.body);
    let task = new toDoModel({
        taskName: req.body.TaskName,
        taskDesc: req.body.TaskDescription
    })
    task.save((err, docs)=>{
        if (!err) {
            res.redirect('/')
        }else{
            console.log(err);
            res.redirect('/')
        }
    })
}

function deleteTask(req, res) {
    id = req.params.id
    toDoModel.findByIdAndDelete(id, function (err, doc) {
        if(!err){
            console.log(`deleted doc of id ${doc._id}`)
            res.redirect('/')
        }
        else{
            console.log(err);
            res.redirect('/')
        }
    })
}
function editTask(req, res) {
let update={}
update.taskName = req.body.EditTaskName
update.taskDesc = req.body.EditTaskDescription
 toDoModel.findByIdAndUpdate(req.params.id, update , function (err, doc) {
    if(!err){
        res.redirect('/')
    }
    else{
        console.log(err);
        res.redirect('/')
    }
})   
}