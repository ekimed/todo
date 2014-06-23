function renderItems(items, count){
	// Before rendering todo-items, clear the existing items in the list
	var list = document.getElementById('todo-list');

	while(list.hasChildNodes()){

		list.removeChild(list.lastChild);

	}

	// Loop through items
	for (var i = 0; i < items.length; i++) {
		var el = document.createElement("li");

		// Create remove button
		var removeBtn = document.createElement('button');
		removeBtn.className = "remove-btn btn btn-default";
		removeBtn.id = items[i]._id;
		removeBtn.setAttribute('type', 'submit');

		// Button text
		var btnText = document.createTextNode('Done');
		removeBtn.appendChild(btnText);
		
		// Create element to display to-do item
		var newItemText = document.createTextNode(items[i].item);
		var textElement = document.createElement('span');
		textElement.appendChild(newItemText);

		// Append to-do item and remove button to list element
		el.appendChild(textElement);
		el.appendChild(removeBtn);

		// Append item to to-do list
		list.appendChild(el);
	}

	// Add event listeners to newly created remove btns
	var removeButton = document.getElementsByClassName("remove-btn");
	
	for (var i = 0; i < removeButton.length; i ++) {

		removeButton[i].addEventListener('click', todo_app.handlers.removeItemHandler);
	}

	// Update count
	var countElement = document.getElementById('count');
	countElement.innerHTML = count;

	// Add list border style if items exist
	var todoList = document.getElementById('todo-list');
	if (todoList.firstChild) {

		todoList.className = 'list-border-style center';

	} else {
		todoList.className = 'center';
	}

}


document.addEventListener("DOMContentLoaded", function(){
	// Load current todo items from db
	todo_app.routes.loadTodoItems();

	var todoForm = document.getElementById('todo-form');
	todoForm.addEventListener('submit', todo_app.handlers.addItemHandler);

}, true)



