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
  var classList = event.target.classList
  if(classList.contains('add-task-btn')) {
    displayUnstagedTask();
    buttonStatus();
  }
  if(classList.contains('create-list-btn')) {
    list.updateTitle();
    displayList(list);
    clearInputs();
  }
  if(classList.contains('clear-all-btn')) {
    clearInputs();
  }
  if(classList.contains('delete-btn')) {
    removeCard();
    buttonStatus();
  }
  if(classList.contains('checkbox-img')) {
    displayCheck();
    deleteStatus();
  }
  if(classList.contains('urgent-container')) {
    displayUrgency();
  }
}

function displayList(listType) {
  var deleteStatus = listType.tasks.every(task => task.checked)
  var btnStatus = deleteStatus;
  deleteStatus ? deleteImg = '-active' : deleteImg = '';
  btnStatus ? btnStatus = '' : btnStatus = 'disabled'

  var urgentStatus = listType.urgent
  var cardUrgent = urgentStatus;
  urgentStatus ? urgentImg = '-active' : urgentImg = '';
  cardUrgent ? cardUrgent = 'urgent-active' : cardUrgent = ''
  
  rightMain.insertAdjacentHTML("afterbegin",`
    <section id="${listType.id}" class="${cardUrgent} task-card-container">
      <h3 class="task-card-title">${listType.title}</h3>
      <section id="card-tasks" class="task-card-items">
      </section>
      <div class="card-option-container">
        <div class="urgent-container">
          <img src="assets/urgent${urgentImg}.svg" class="${cardUrgent} urgent-img">
          <p class="urgent-text">URGENT</p>
        </div>
        <div class="delete-container">
          <button ${btnStatus} class="delete-btn">
            <img src="assets/delete${deleteImg}.svg" class="delete-img delete-list-img">
          </button
          <p class="delete-text">DELETE</p>
        </div>
      </div>
    </section>`);
  if(list.tasks.length) {
    lists.push(list)
    list.saveToStorage();
    displayTasks(listType)
    list = new List();
  }
}

function displayTasks(listType) {
  var cardTaskContainer = document.getElementById('card-tasks')
  for (var i = 0; i < listType.tasks.length; i++) {
    var check = stateOfCheck(listType.tasks[i]);
    var taskTitle = listType.tasks[i].title;
    var taskId = listType.tasks[i].id;
    cardTaskContainer.insertAdjacentHTML('beforeend',`
    <section id="${taskId}" class="create-task-container">
      <img id="${taskId}" data-id="${check}" id="delete" src="assets/checkbox${check}.svg" class="checkbox-img" img>
      <p class="create-task-name">${taskTitle}</p>
    </section>`);
  }
  unstagedTasks.innerHTML = '';
  createListBtn.setAttribute('disabled', 'disabled');
}

function displayUnstagedTask() {
  var taskTitle = taskInput.value;
  var task = new Task(taskTitle);
  unstagedTasks.insertAdjacentHTML('beforeend',
     ` <section id="${task.id}" class="create-task-container">
        <img data-id="unchecked" id="delete" src="assets/delete.svg" class=" delete-img delete-task-img delete-btn">
        <p class="create-task-name">${task.title}</p>
      </section>`);
  list.updateListTasks(task);
  taskInput.value = '';
  addTaskBtn.setAttribute('disabled', 'disabled');
}

function deleteStatus() {
  var currentList;
  var card = event.target.closest('.task-card-container');
  var deleteImg = card.querySelector('.delete-img');
  var deleteBtn = card.querySelector('.delete-btn');
  lists.forEach(list => {
    if(list.id == card.id) {
      currentList = list;
    }
  })
  var deleteStatus = currentList.tasks.every(task => task.checked);
  deleteStatus ? deleteImg.src = 'assets/delete-active.svg' : deleteImg.src = 'assets/delete.svg';
  deleteStatus ? deleteBtn.removeAttribute('disabled') : deleteBtn.setAttribute('disabled', 'disabled');
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

function stateOfCheck(task) {
  var checked;
  task.checked ? checked = '-active' : checked = '';
  return checked;
}

function removeCard() {
  var taskContainer = event.target.closest('section');
  taskContainer.remove();
  lists.forEach((currentList, i) => {
    taskContainer.id == currentList.id ? lists.splice(i, 1) : null;
  });
  list.tasks.forEach((task, i) => {
    taskContainer.id == task.id ? list.tasks.splice(i, 1) : null;
  });
  list.saveToStorage();
}

function displayCheck() {
  var clicked = event.target
  if(clicked.dataset.id === '') {;
    clicked.dataset.id = '-active';
    clicked.src = 'assets/checkbox-active.svg';
  } else {
    clicked.dataset.id === '-active';
    clicked.dataset.id = '';
    clicked.src = 'assets/checkbox.svg';
  }
  trackCheck();
}

function trackCheck() {
  var imgId = event.target.id;
  lists.forEach(createdList => {
    createdList.tasks.forEach(task => {
      if(imgId == task.id) {
        createdList.updateTask(task);
      }
    });
  });
}

function displayUrgency() {
  var closestCard = event.target.closest('.task-card-container');
  var urgentIcon = closestCard.querySelector('img.urgent-img')
  if (urgentIcon.classList.contains('urgent-active')) {
    urgentIcon.src = 'assets/urgent.svg';
    urgentIcon.classList.remove('urgent-active');
    closestCard.classList.remove('urgent-active');
  } else {
    urgentIcon.src = 'assets/urgent-active.svg';
    urgentIcon.classList.add('urgent-active');
    closestCard.classList.add('urgent-active');
  }
  markCardUrgent();
}

function markCardUrgent() {
  var urgentCard = event.target.closest('.task-card-container');
  var itemToUpdate = lists.find(function(taskList) {
    return taskList.id == urgentCard.id;
  });
  if(!itemToUpdate.urgent) {
    itemToUpdate.urgent = true;
  } else {
    itemToUpdate.urgent = false;
  }
  list.saveToStorage()
}

function parseObject() {
  var fullList = [];
  lists.forEach(lsList => {
    var newList = new List(lsList.title, lsList.id, lsList.tasks, lsList.urgent)
    fullList.push(newList);
    displayList(newList);
    displayTasks(newList);
  })
  lists = fullList;
}