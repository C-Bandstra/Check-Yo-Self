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

function displayList() {
    list.getFromStorage();
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
  list.saveToStorage(list);
  list = new List();
}

function displayTasks() {
  var cardTasks = document.getElementById('card-tasks')
  cardTasks.innerHTML = unstagedTasks.innerHTML;
  unstagedTasks.innerHTML = ''
}


function displayUnstagedTask() {
  var taskTitle = taskInput.value;
  var task = new Task(taskTitle);
  unstagedTasks.insertAdjacentHTML('beforeend',
    `<div id="${task.id}" class="create-task-container">
        <img src="assets/delete.svg" alt="checkbox" class="delete-task-img">
        <p class="create-task-name">${task.title}</p>
      </div>`)
  list.updateListTasks(task)
  taskInput.value = ''
}
