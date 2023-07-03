const add_task = document.querySelector(".task_list");
const add_btn = document.getElementById('add');
const detail = document.getElementById('task_detl');
const warning = document.querySelector('.warning')
const empty = document.querySelector('.empty')

// Load tasks from local storage on page load
window.addEventListener('load', loadTasksFromStorage);

// Add Task Function
function addTask() {
  if (detail.value != '') {
    const task = document.createElement('div');
    task.setAttribute('id', 'task');
    add_task.appendChild(task);
    addTaskButton(task);
    addTaskDetail(task);
    addEditButton(task);
    addRemoveButton(task);
    detail.value = '';

    // Save tasks to local storage
    saveTasksToStorage();
  } else {
    warning.style.display = 'block'
    setTimeout(() => {
      warning.style.display = 'none'
    }, 3000)
  }
}

function addTaskButton(task) {
  const btnSubmit = document.createElement('button');
  btnSubmit.setAttribute('type', 'submit');
  btnSubmit.classList.add('button_task', 'green');
  btnSubmit.setAttribute('id', 'done')
  btnSubmit.textContent = 'DONE';
  task.appendChild(btnSubmit);
  btnSubmit.addEventListener('click', done);
}

function addTaskDetail(task) {
  const taskDetail = document.createElement('div');
  taskDetail.classList.add('task_detail');
  taskDetail.textContent = detail.value;
  task.appendChild(taskDetail);
}

function addEditButton(task) {
  const btnEdit = document.createElement('button');
  btnEdit.setAttribute('type', 'submit');
  btnEdit.classList.add('button_task', 'gray');
  btnEdit.setAttribute('id', 'edit')
  btnEdit.textContent = 'EDIT';
  task.appendChild(btnEdit);
  btnEdit.addEventListener('click', edit);
}

function addRemoveButton(task) {
  const btnRemove = document.createElement('button');
  btnRemove.setAttribute('type', 'submit');
  btnRemove.classList.add('button_task', 'red');
  btnRemove.setAttribute('id', 'delete')
  btnRemove.textContent = 'REMOVE';
  task.appendChild(btnRemove);
  btnRemove.addEventListener('click', deletef);
}

add_btn.addEventListener('click', addTask);

// Clear Function
let clear_btn = document.getElementById('clear')

function clear() {
  detail.value = '';
}

clear_btn.addEventListener('click', clear)

// Delete Function
function deletef(event) {
  let task = event.target.parentNode;
  task.remove();

  // Save tasks to local storage
  saveTasksToStorage();
}

// Done Function
function done(event) {
  const done_task = event.target.parentNode;
  done_task.classList.add('done');

  // Save tasks to local storage
  saveTasksToStorage();
}

// Edit Function
function edit(event) {
  const task = event.target.parentNode;
  const taskDetail = task.querySelector('.task_detail');
  const newText = prompt('Enter the Detail Of Task');
  if (newText != '') {
    taskDetail.textContent = newText;
    
    // Save tasks to local storage
    saveTasksToStorage();
  } else {
    empty.style.display = 'block'
    setTimeout(() => {
      empty.style.display = 'none'
    }, 3000)
  }
  task.classList.remove('done');
  
  // Save tasks to local storage
  saveTasksToStorage();
}

// Load tasks from local storage
function loadTasksFromStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    tasks.forEach((task) => {
      const taskElement = document.createElement('div');
      taskElement.setAttribute('id', 'task');
      add_task.appendChild(taskElement);
      addTaskButton(taskElement);
      addTaskDetail(taskElement);
      addEditButton(taskElement);
      addRemoveButton(taskElement);
      taskElement.querySelector('.task_detail').textContent = task.detail;
      if (task.done) {
        taskElement.classList.add('done');
      }
    });
  }
}

// Save tasks to local storage
function saveTasksToStorage() {
  const tasks = [];
  const taskElements = document.querySelectorAll('#task');
  taskElements.forEach((taskElement) => {
    const detail = taskElement.querySelector('.task_detail').textContent;
    const done = taskElement.classList.contains('done');
    tasks.push({ detail, done });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}