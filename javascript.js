const addTaskMenu = document.getElementById('addTaskMenu');
const showAddTaskMenuBtn = document.getElementById('showAddTaskMenu');
const addTaskButton = document.getElementById('addTaskButton');
const newTaskInput = document.getElementById('newTaskInput');
const todoColumn = document.getElementById('todo');

showAddTaskMenuBtn.addEventListener('click', () => {
  // Alternar visibilidade do menu
  if (addTaskMenu.classList.contains('hidden')) {
    addTaskMenu.classList.remove('hidden');
    addTaskMenu.style.display = 'flex';
    newTaskInput.focus();
  } else {
    addTaskMenu.classList.add('hidden');
    addTaskMenu.style.display = 'none';
  }
});

addTaskButton.addEventListener('click', () => {
  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    const newTask = document.createElement('div');
    newTask.classList.add('kanban-item');
    newTask.setAttribute('draggable', 'true');
    newTask.textContent = taskText;

    newTask.addEventListener('dragstart', handleDragStart);
    newTask.addEventListener('dragend', handleDragEnd);

    todoColumn.appendChild(newTask);

    newTaskInput.value = '';

    addTaskMenu.classList.add('hidden');
    addTaskMenu.style.display = 'none';
  }
});

function handleDragStart(event) {
  event.target.classList.add('dragging');
}

function handleDragEnd(event) {
  event.target.classList.remove('dragging');
}

document.querySelectorAll('.kanban-column').forEach((column) => {
  column.addEventListener('dragover', (event) => {
    event.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    if (draggingItem) {
      column.appendChild(draggingItem);
    }
  });
});
