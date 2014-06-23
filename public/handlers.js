var handlers = {
	addItemHandler: function(e) {
		e.preventDefault();

		var todoItemText = document.getElementById('todoItemText').value;

		XMLHttpRequestModule.postTodo(todoItemText);

		// todo_app.routes.postTodo(todoItemText);

		// Reset form after post request
		var form = document.getElementById('todo-form');
		form.reset()

		return false;

	},

	removeItemHandler: function(e) {
		e.preventDefault();

		e.target.previousSibling.className = 'strikethrough-done';

		var link = '/todo/' + e.target.id;

		setTimeout(function() {
			XMLHttpRequestModule.deleteTodo(link);
			// todo_app.routes.deleteTodo(link);
		}, 150);

		return false;
	}
}

todo_app.handlers = handlers;