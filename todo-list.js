class List {
  constructor(title, id) {
    this.title = title;
    this.id = id;
    this.tasks = [];
    this.urgent = false;
  }

  updateListTasks(task) {
    this.tasks.push(task)
  }

  saveToStorage() {
    
  }

  retrieveFromStorage() {

  }

  deleteFromStorage() {

  }

  updateToDo() {

  }

  updateTask() {

  }
}
