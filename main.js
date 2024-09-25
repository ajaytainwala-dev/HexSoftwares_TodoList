// Variables
var root = document.querySelector(':root')
var container = document.querySelector('.container');
var newTaskInput = document.getElementById('new_task_input')
var taskform = document.getElementById('new_task_form');
var tasksList = document.getElementById('tasksList');
var taskBtns = document.querySelectorAll('.task_check_btn');
var themeBtn = document.querySelector('.theme_toogle_btn');
let heading = document.getElementsByClassName("heading")[0];

const today = new Date();
const options = { weekday: 'long', day: 'numeric' };
heading.innerText = `Todo List of ${today.toLocaleDateString(undefined, options)}`;
// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Do this when we submit the form
taskform.addEventListener('submit', function (e) {
  e.preventDefault();
  var newtaskInputValue = taskform.elements.new_task_input;
  if(newtaskInputValue.value==="")
    alert("Field is Required")
  else
    addTask(newtaskInputValue.value);
  saveTaskToLocalStorage(newtaskInputValue.value);
  // Reset input value to empty
  newtaskInputValue.value = '';
  container.classList.remove('task_list_empty');
});

// To add task in List
function addTask(newTask) {
  // Create li element and set its class
  const newTaskItem = document.createElement('li');
  newTaskItem.setAttribute('class', 'task_item');

  // Create checkbox element and set its type and class 
  const newCheckBtn = document.createElement('div');
  newCheckBtn.setAttribute('class', 'task_check_btn');

  // Create span element and set its class and add new task input
  const newTaskBio = document.createElement('span');
  newTaskBio.setAttribute('class', 'task_bio');
  // Put value of input in it
  newTaskBio.innerText = newTask; // putting value of input in the li

  // append (insert) li tag in Ul
  tasksList.appendChild(newTaskItem);
  // append (insert) checkbox in li
  newTaskItem.appendChild(newCheckBtn);
  // append (insert) newtask in li
  newTaskItem.appendChild(newTaskBio);

  // Run this function when task is completed or checkbox is checked
  onTaskComplete(newCheckBtn);
}

// To remove the completed task
function onTaskComplete(btns) {
  btns.addEventListener('click', function (e) {
    var parent = e.target.parentElement;
    parent.classList.add('task-completed'); // To slide out the task to the right
    // Now we delete that task which we have slided out
    setTimeout(() => {
      // Removing Parent Element of checkbox which is Li in 0.5 s
      removeTaskFromLocalStorage(parent.innerText);
      parent.remove();
    }, 400);

    if (tasksList.childNodes.length == 1) {
      setTimeout(() => {
        container.classList.add('task_list_empty');
      }, 800);
    }
  });
}

// Save task to local storage
function saveTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    addTask(task);
  });
}

// Remove task from local storage
function removeTaskFromLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

