var express = require("express");
var toDoController = require("./controller/toDoController");

var app = express();

// Set up template engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));


// FIre controller
toDoController(app);



// Listen to the port
app.listen(89,'localhost');
console.log('you are listening to port no : 89');
