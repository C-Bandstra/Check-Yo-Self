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

  saveToStorage(list) {
    var stringedList = JSON.stringify(list)
    localStorage.setItem('list', stringedList)
  }

  getFromStorage() {
    var parsedList = JSON.parse(localStorage.getItem('list'))
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
