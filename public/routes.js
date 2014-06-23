
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

	function makeRequest(HTTPRequestMethodString, linkString) {
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 || xhr.status === 200) {
				var response = JSON.parse(xhr.responseText);
				console.log('server response', response);
				renderItems(response.todoItems, response.count);
			} else {
				console.log('error: There was a problem with the Get request. Status Code: ', xhr.status);
			}
		};

		xhr.open(HTTPRequestMethodString, linkString, true);

		if (HTTPRequestMethodString === 'POST') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		
		if (arguments.length === 3) {
			xhr.send('todoItem=' + encodeURIComponent(arguments[2]));
		} else {
			xhr.send(null);
		}
		
	}

	// Return an object exposed to the public
	var module =  {

		loadTodo: function() {
			makeRequest('GET', '/todo');
		},

		postTodo: function(todoItem){
			makeRequest('POST', '/todo/post', todoItem);
		},

		deleteTodo: function(link) {
			makeRequest('GET', link);
		}
	}

	return module;
})()
