const addTaskMenu = document.getElementById('addTaskMenu');
const showAddTaskMenuBtn = document.getElementById('showAddTaskMenu');
const addTaskButton = document.getElementById('addTaskButton');
const newTaskInput = document.getElementById('newTaskInput');
const todoColumn = document.getElementById('todo');

showAddTaskMenuBtn.addEventListener('click', () => {
  addTaskMenu.classList.toggle('hidden');
});

addTaskButton.addEventListener('click', () => {
  const taskText = newTaskInput.value;
  if (taskText !== '') {
    const newTask = document.createElement('div');
    newTask.classList.add('kanban-item');
    newTask.setAttribute('draggable', 'true');

    const uniqueId = 'task-' + new Date().getTime();
    newTask.setAttribute('id', uniqueId);
    newTask.textContent = taskText;

    newTask.addEventListener('dragstart', dragStart);
    newTask.addEventListener('dragend', dragEnd);

    todoColumn.appendChild(newTask);

    newTaskInput.value = '';
    addTaskMenu.classList.add('hidden');
  }
});

const dragStart = (event) => {
  event.dataTransfer.setData('text/plain', event.target.id);
  setTimeout(() => {
    event.target.classList.add('hide');
  }, 0);
};

const dragEnd = (event) => {
  event.target.classList.remove('hide');
};

const columns = document.querySelectorAll('.kanban-column');

columns.forEach((column) => {
  column.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  column.addEventListener('drop', (event) => {
    const id = event.dataTransfer.getData('text');
    const draggable = document.getElementById(id);
    column.appendChild(draggable);
  });
});
