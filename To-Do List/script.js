document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Function to add a new task to the list
    const addTask = () => {
        const taskText = todoInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        // Create a delete button for the list item
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Using Font Awesome icon
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => {
            todoList.removeChild(listItem);
        };

        // Append elements to the list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);

        // Append the list item to the list
        todoList.appendChild(listItem);

        // Clear the input field
        todoInput.value = '';
    };

    // Event listener for the add button
    addButton.addEventListener('click', addTask);

    // Event listener for the Enter key
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});