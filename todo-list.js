class List {
  constructor(title, id, tasks) {
    this.title = title;
    this.id = id || Date.now();
    this.tasks = tasks || [];
    this.urgent = false;
  }

  updateTitle() {
    this.title = `${titleInput.value}`;
  }

  updateListTasks(task) {
    this.tasks.push(task);
  }

  saveToStorage(list, lists) {
    lists.push(list);
    var stringedLists = JSON.stringify(lists);
    localStorage.setItem('lists', stringedLists);
  }
  
  deleteFromStorage(lists) {
    var stringedLists = JSON.stringify(lists);
    localStorage.setItem('lists', stringedLists);
  }

  updateToDo() {

  }

  updateTask() {
    this.tasks.forEach(task => {
      task.checked ? task.checked = false : task.checked = true;
    });
    var stringedLists = JSON.stringify(lists)
    localStorage.setItem('lists', stringedLists)
  }
}
