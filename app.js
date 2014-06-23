var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routesController = require('./controllers/routes.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// Connect to database
mongoose.connect('mongodb://localhost/ToDo')

// Verify connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
	console.log('db successfully connected!');
});

// Routes
app.get('/', routesController.index);
app.get('/todo', routesController.getAllItems);
app.post('/todo/post', routesController.addItem);
app.get('/todo/:id', routesController.deleteItem);

var server = app.listen(7223, function() {
	console.log('Express server listening on port ' + server.address().port);
});

