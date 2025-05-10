let todos = JSON.parse(localStorage.getItem('todos')) || [];
let editIndex = null;

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById('todoInput');
  const value = input.value.trim();

  if (value === '') return alert('Please enter a task');

  if (editIndex !== null) {
    todos[editIndex] = value;
    editIndex = null;
  } else {
    todos.push(value);
  }

  input.value = '';
  saveTodos();
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${todo}
      <div class="actions">
        <button class="edit-btn" onclick="editTodo(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function editTodo(index) {
  document.getElementById('todoInput').value = todos[index];
  editIndex = index;
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}


renderTodos();