
var XMLHttpRequestModule = (function(){

	// Privates
	var xhr = (function() {
		var xhr; 
		if (window.XMLHttpRequest) {
			return xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) { // IE 8<
			return xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
	})();

	var processRequest = function() {
		if (xhr.readyState === 4 || xhr.status === 200) {
			var response = JSON.parse(xhr.responseText);
			console.log('server response', response);
			renderItems(response.todoItems, response.count);
		} else {
			console.log('error: There was a problem with the Get request. Status Code: ', xhr.status);
		}
	};

	// Return an object exposed to the public
	return {

		// Load all todo items from db
		loadTodo: function() {
			xhr.onreadystatechange = processRequest;
			xhr.open('GET', '/todo', true);
			xhr.send(null);

		},

		// Add todo item to db
		postTodo: function(todoItem) {
			xhr.onreadystatechange = processRequest;
			xhr.open('POST', '/todo/post', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send('todoItem=' + encodeURIComponent(todoItem));
		},

		// Delete item from db
		deleteTodo: function(link) {
			xhr.onreadystatechange = processRequest;
			xhr.open('GET', link, true);
			xhr.send(null);
		}
	}
})()
