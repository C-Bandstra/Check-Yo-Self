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
var lists = JSON.parse(localStorage.getItem('lists')) || [];
window.onload = parseObject();

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
    list.updateTitle();
    checkListType()
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
    deleteButtonStatus();
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

function deleteButtonStatus() {
  debugger
  var deleteStatus;
  lists.forEach(list => {
    for (let i = 0; i < list.tasks.length; i++) {
      if(list.tasks[i].checked) {
        deleteStatus = true;
      } else {
        deleteStatus = false;
        break;
      }
    }
  });
  displayDelete(deleteStatus);
}

function displayDelete(deleteStatus) {
  var deleteImg = document.getElementById('delete')
  if(deleteStatus) {
    deleteImg.src = 'assets/delete-active.svg';
  } else {
    deleteImg.src = 'assets/delete.svg';
  }
}

function clearInputs() {
  titleInput.value = '';
  taskInput.value = '';
  unstagedTasks.innerHTML = '';
  buttonStatus();
}

function checkListType(lsList) {
  var listType;
  if(lsList == undefined) {
    listType = list;
  } else {
    listType = lsList
  }
  displayList(listType);
  displayTasks(listType);
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

function displayList(listType) {
    rightMain.insertAdjacentHTML("afterbegin",`
    <section id="${listType.id}" class="task-card-container">
    <h3 class="task-card-title">${listType.title}</h3>
    <section id="card-tasks" class="task-card-items">
    </section>
    <div class="card-option-container">
      <div class="urgent-container">
        <img src="assets/urgent.svg" class="urgent-img">
        <p class="urgent-text">URGENT</p>
      </div>
      <div class="delete-container">
        <img id="delete" src="assets/delete.svg" class="delete-img delete-list-img">
        <p class="delete-text">DELETE</p>
      </div>
    </div>
  </section>`);
  if(list.tasks.length) {
    list.saveToStorage(list, lists);
    list = new List();
  }
}

function displayTasks(listType) {
  var cardTaskContainer = document.getElementById('card-tasks')
  for (var i = 0; i < listType.tasks.length; i++) {
    var check = stateOfCheck(listType.tasks[i]);
    var taskTitle = listType.tasks[i].title
    var taskId = listType.tasks[i].id
    cardTaskContainer.insertAdjacentHTML('beforeend',`
    <section id="${taskId}" class="create-task-container">
      <img id="${taskId}" data-id="${check}" id="delete" src="assets/checkbox${check}.svg" class="checkbox-img" img>
      <p class="create-task-name">${taskTitle}</p>
    </section>`);
  }
  unstagedTasks.innerHTML = '';
  createListBtn.setAttribute('disabled', 'disabled');
}

function stateOfCheck(task) {
  var checked;
  if(task.checked) {
    checked = '-active';
  } else {
    checked = '';
  }
  return checked
}

function removeCard() {
  var taskContainer = event.target.closest('section');
  taskContainer.remove();
  unstagedTasks.innerHTML = '';
  lists.forEach((currentList, i) => {
    if(taskContainer.id == currentList.id) {
      lists.splice(i, 1);
    }
  });
  list.deleteFromStorage(lists);
}

function displayCheck() {
  if(event.target.dataset.id === '') {;
    event.target.dataset.id = '-active';
    event.target.src = 'assets/checkbox-active.svg';
  } else {
    event.target.dataset.id === '-active';
    event.target.dataset.id = '';
    event.target.src = 'assets/checkbox.svg';
  }
  trackCheck();
}

function trackCheck() {
  var imgId = event.target.id
  lists.forEach(createdList => {
    createdList.tasks.forEach(task => {
      if(imgId == task.id) {
        createdList.updateTask();
      }
    });
  });
}

function parseObject() {
  var fullList = []
  lists.forEach(lsList => {
    var newList = new List(lsList.title, lsList.id, lsList.tasks)
    fullList.push(newList);
    checkListType(newList);
    deleteButtonStatus();
  })
  lists = fullList;
}