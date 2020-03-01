class List {
  constructor(title) {
    this.title = title;
    this.id = Date.now();
    this.tasks = [];
    this.urgent = false;
  }

  updateTitle() {
    list.title = `${titleInput.value}`;
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

  }
}
