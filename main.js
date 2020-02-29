// Variables
var body = document.querySelector('body');
var taskInput = document.querySelector('.task-item-input');
var titleInput = document.querySelector('.list-title-input');
var searchInput = document.querySelector('.search-input');
var addTaskBtn = document.querySelector('.add-task-btn');
var clearBtn = document.querySelector('.clear-all-btn')
var createListBtn = document.querySelector('.create-list-btn');
var searchBtn = document.querySelector('.search-btn');
var rightMain = document.querySelector('.right-main');
var unstagedTasks = document.querySelector('.unstaged-task-container');
var list = new List();
window.onload = list.getFromStorage();
var lists = JSON.parse(localStorage.getItem('lists')) || [];


// Event Listeners
body.addEventListener('click', clickHandler);
body.addEventListener('input', buttonStatus);

// Functions
function clickHandler(event) {
  if(event.target.classList.contains('add-task-btn')) {
    displayUnstagedTask();
    buttonStatus();
  }
  if(event.target.classList.contains('create-list-btn')) {
    list.updateTitle(taskInput);
    displayList();
    clearInputs();
  }
  if(event.target.classList.contains('clear-all-btn')) {
    clearInputs();
  }
  if(event.target.classList.contains('delete-img')) {
    removeCard();
    buttonStatus();
  }
  if(event.target.classList.contains('checkbox-img')) {
    displayCheck();
  }
}

function buttonStatus() {
  searchInput.value ? searchBtn.removeAttribute('disabled') : searchBtn.setAttribute('disabled', 'disabled');
  taskInput.value ? addTaskBtn.removeAttribute('disabled') : addTaskBtn.setAttribute('disabled', 'disabled');
  if(unstagedTasks.innerHTML != '' && titleInput.value) {
    createListBtn.removeAttribute('disabled');
  } else {
    createListBtn.setAttribute('disabled', 'disabled');
  }
  if(unstagedTasks.innerHTML != '' || titleInput.value) {
    clearBtn.removeAttribute('disabled');
  } else {
    clearBtn.setAttribute('disabled', 'disabled');
  }
}

function clearInputs() {
  titleInput.value = '';
  taskInput.value = '';
  unstagedTasks.innerHTML = '';
  buttonStatus();
}

function displayStoredLists(parsedLists) {
    parsedLists.forEach((storedList, i) => {
    rightMain.insertAdjacentHTML('afterbegin', `
    <section id="${storedList.id}" class="task-card-container">
    <h3 class="task-card-title">${storedList.title}</h3>
    <section id="stored-card-tasks" class="task-card-items">
    </section>
    <div class="card-option-container">
      <div class="urgent-container">
        <img src="assets/urgent.svg" alt="checkbox" class="urgent-img">
        <p class="urgent-text">URGENT</p>
      </div>
      <div class="delete-container">
        <img src="assets/delete.svg" alt="checkbox" class="delete-img delete-list-img">
        <p class="delete-text">DELETE</p>
      </div>
    </div>
  </section>`);
  displayStoredTasks(parsedLists[i].tasks);
  });
}

function displayStoredTasks(storedTasks) {
  var storedCardTaskContainer = document.getElementById('stored-card-tasks');
  storedTasks.forEach(storedTask => {
    storedCardTaskContainer.insertAdjacentHTML('beforeend', `
      <section id="${storedTask.id}" class="create-task-container">
        <img data-id="unchecked" src="assets/checkbox.svg" alt="checkbox" class="checkbox-img">
        <p class="create-task-name">${storedTask.title}</p>
      </section>`);
  });
}

function displayUnstagedTask() {
  var taskTitle = taskInput.value;
  var task = new Task(taskTitle);
  unstagedTasks.insertAdjacentHTML('beforeend',
     ` <section id="${task.id}" class="create-task-container">
        <img data-id="unchecked" id="delete" src="assets/delete.svg" class="delete-img delete-task-img">
        <p class="create-task-name">${task.title}</p>
      </section>`);
  list.updateListTasks(task);
  taskInput.value = ''
  addTaskBtn.setAttribute('disabled', 'disabled');
}

function displayList() {
    rightMain.insertAdjacentHTML("afterbegin",`
    <section class="task-card-container">
    <h3 class="task-card-title">${list.title}</h3>
    <section id="card-tasks" class="task-card-items">
    </section>
    <div class="card-option-container">
      <div class="urgent-container">
        <img src="assets/urgent.svg" class="urgent-img">
        <p class="urgent-text">URGENT</p>
      </div>
      <div class="delete-container">
        <img src="assets/delete.svg" class="delete-img delete-list-img">
        <p class="delete-text">DELETE</p>
      </div>
    </div>
  </section>`);
  displayTasks();
  list.saveToStorage(list, lists);
  list = new List();
}

function displayTasks() {
  var cardTaskContainer = document.getElementById('card-tasks')
  for (var i = 0; i < list.tasks.length; i++) {
    var taskTitle = list.tasks[i].title
    var taskId = list.tasks[i].id
    cardTaskContainer.insertAdjacentHTML('beforeend',`
    <section id="${taskId}" class="create-task-container">
      <img data-id="unchecked" id="delete" src="assets/checkbox.svg" class="checkbox-img" img>
      <p class="create-task-name">${taskTitle}</p>
    </section>`);
  }
  unstagedTasks.innerHTML = '';
  createListBtn.setAttribute('disabled', 'disabled');
}

function removeCard() {
  var taskContainer = event.target.closest('section');
  unstagedTasks.innerHTML = '';
  lists.forEach((list, i) => {
    if(taskContainer.id == list.id) {
      lists.splice(i, 1);
    }
  });
}

function displayCheck() {
  var checkImg = event.target.closest('img');
  if(checkImg.dataset.id === 'unchecked') {;
    checkImg.dataset.id = 'checked';
    checkImg.src = 'assets/checkbox-active.svg';
  } else {
    checkImg.dataset.id = 'unchecked';
    checkImg.src = 'assets/checkbox.svg';
  }
}