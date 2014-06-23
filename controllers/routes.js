var model = require('../models/todo-model.js');

var ToDo = model.todoItem;


// Retrieve and send all existing documents and the total number of documents from model collection
var sendData = function(res) {
	ToDo.find({}, function(err, todoItems){
		if (err) console.log('Error retrieving all to-do items', err)
		ToDo.count({}, function(err, count) {
			console.log(count);
			if (count === undefined) {
				count = 0;
			}
			res.send({
				todoItems: todoItems,
				count: count
			});
		});
	});
}

// route controllers
routesController = {
	index: function(req, res) {
		res.render('index');		
	},

	getAllItems: function(req, res) {
		sendData(res);
	},

	addItem: function(req, res) {
		var newTodo = new model.todoItem();
		
		// Get to-do item from form
		var item = req.body.todoItem;
		console.log(item)

		// Create new to-do item
		model.createItem(newTodo, item, function(err, item){
			if (err) console.log('Error when creating new todo item in database', err);

			else{
				console.log('item was successfully added to database: ', item);
				sendData(res);
			}
		});		
	},

	deleteItem: function(req, res) {
		var id = req.params.id;

		model.deleteItem(ToDo, id);

		// Get all items excluding deleted item
		ToDo.find({}, function(err, todoItems) {
			if (err) console.log('Error retrieving all to-do items', err);
			sendData(res);

		});
	}
}

module.exports = routesController;