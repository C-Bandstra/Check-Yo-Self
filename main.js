// Variables
var body = document.querySelector('body');
var taskInput = document.querySelector('.task-item-input');
var titleInput = document.querySelector('.list-title-input')
var addTaskBtn = document.querySelector('.add-task-btn');
// var clearBtn = document.querySelector('.clear-all-btn')
var rightMain = document.querySelector('.right-main')
var unstagedTasks = document.querySelector('.unstaged-task-container')
var list = new List();
window.onload = list.getFromStorage();
var lists = JSON.parse(localStorage.getItem('list')) || [];


// Event Listeners
body.addEventListener('click', clickHandler)

// Functions
function clickHandler(event) {
  if(event.target.classList.contains('add-task-btn')) {
    displayUnstagedTask();
  }
  if(event.target.classList.contains('create-list-btn')) {
    list.title = `${titleInput.value}`
    displayList();
    clearInputs();
  }
  if(event.target.classList.contains('clear-all-btn')) {
    clearInputs();
  }
}

function clearInputs() {
  titleInput.value = '';
  taskInput.value = '';
  unstagedTasks.innerHTML = '';

}

function displayStoredLists(parsedLists) {
  parsedLists.forEach((storedList, i) => {
    rightMain.insertAdjacentHTML('afterbegin', `
    <section class="task-card-container">
    <h3 class="task-card-title">${storedList.title}</h3>
    <section id="stored-card-tasks" class="task-card-items">
    </section>
    <section class="card-option-container">
      <div class="urgent-container">
        <img src="assets/urgent.svg" alt="checkbox" class="urgent-img">
        <p class="urgent-text">URGENT</p>
      </div>
      <div class="delete-container">
        <img src="assets/delete.svg" alt="checkbox" class="delete-list-img">
        <p class="delete-text">DELETE</p>
      </div>
    </section>
  </section>`)
  displayStoredTasks(parsedLists[i].tasks);
    });
}

function displayList() {
    rightMain.insertAdjacentHTML("afterbegin",`
    <section class="task-card-container">
    <h3 class="task-card-title">${list.title}</h3>
    <section id="card-tasks" class="task-card-items">
    </section>
    <section class="card-option-container">
      <div class="urgent-container">
        <img src="assets/urgent.svg" alt="checkbox" class="urgent-img">
        <p class="urgent-text">URGENT</p>
      </div>
      <div class="delete-container">
        <img src="assets/delete.svg" alt="checkbox" class="delete-list-img">
        <p class="delete-text">DELETE</p>
      </div>
    </section>
  </section>`)
  console.log(list)
  displayTasks();
  list.saveToStorage(list, lists);
  list = new List();
}

function displayStoredTasks(storedTasks) {
  var storedCardTaskContainer = document.getElementById('stored-card-tasks')
  storedTasks.forEach(storedTask => {
    storedCardTaskContainer.insertAdjacentHTML('beforeend', `
    <div id="${storedTask.id}" class="create-task-container">
        <img src="assets/delete.svg" alt="checkbox" class="delete-task-img">
        <p class="create-task-name">${storedTask.title}</p>
      </div>`)
  });
}

function displayTasks() {
  var cardTaskContainer = document.getElementById('card-tasks')
  cardTaskContainer.innerHTML = unstagedTasks.innerHTML;
  unstagedTasks.innerHTML = ''
}

function displayUnstagedTask() {
  var taskTitle = taskInput.value;
  var task = new Task(taskTitle);
  unstagedTasks.insertAdjacentHTML('beforeend',
     ` <div id="${task.id}" class="create-task-container">
        <img src="assets/delete.svg" alt="checkbox" class="delete-task-img">
        <p class="create-task-name">${task.title}</p>
      </div>`);
  list.updateListTasks(task)
  taskInput.value = ''
}
