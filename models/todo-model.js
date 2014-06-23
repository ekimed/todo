var mongoose = require('mongoose');

var toDoSchema = new mongoose.Schema({
	item: String
})

// To-Do item model
var todoItem = mongoose.model('todo', toDoSchema, 'todos');

// Create new to-do item in database
var createItem = function(model, text, cb){
	model.item = text;

	// Save to-do item
	model.save(function(err, item){
		if (err){
			console.log('error saving new to-do item', err);
		}
		cb(err, item)
	})

};

var deleteItem = function(model, id){
	// Remove documents with matching id
	model.remove({
		_id: id
	}, function(err){
		console.log('error has occured, item not removed', err);
	})
};

module.exports = {
	todoItem: todoItem,
	createItem: createItem,
	deleteItem: deleteItem
}