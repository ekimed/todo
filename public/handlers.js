// Event handler module
var handlers = (function() {
	return {
		// Click event results in item being added to db
		addItem: function(e) {
			e.preventDefault();

			var todoItemText = document.getElementById('todoItemText').value;

			XMLHttpRequestModule.postTodo(todoItemText);

			// Reset form after post request
			var form = document.getElementById('todo-form');
			form.reset()

			return false;

		},

		// Clieve event results in item being removed from db
		removeItem: function(e) {
			e.preventDefault();

			e.target.previousSibling.className = 'strikethrough-done';

			var link = '/todo/' + e.target.id;

			setTimeout(function() {
				XMLHttpRequestModule.deleteTodo(link);

			}, 150);

			return false;
		}

	}
})();