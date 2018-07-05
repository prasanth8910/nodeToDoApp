let bodyParser = require('body-parser');
var mongoose = require('mongoose')
// let mongoose = require('mongoose');

mongoose.connect('mongodb://test:178111bp@ds127851.mlab.com:27851/prasanth');


// // Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

// Create model - ToDo is a collection name
var Todo = mongoose.model('Todo', todoSchema);


let urlencodedParser = bodyParser.urlencoded({ extended: false });

 module.exports = function (app) {

    app.get('/todo', function (req, res) {
        // Get data from mongodb and pass it to view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
            
            
        });
     });

    app.post('/todo', urlencodedParser, function (req, res) {

        // Get data from the view and add it to mongodb
        let newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;

            res.json(data);
            console.log(data);
            console.log("Item saved");
        });
    });


    app.delete('/todo/:item', function (req, res) {
        // Delete requested item from mongodb
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        })
    });
};

