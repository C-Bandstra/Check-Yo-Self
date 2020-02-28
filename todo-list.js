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

  saveToStorage(list, lists) {
    debugger
    lists.push(list)
    var stringedLists = JSON.stringify(lists);
    localStorage.setItem('lists', stringedLists)
  }

  getFromStorage() {
    var parsedLists = JSON.parse(localStorage.getItem('lists'))
    if(parsedLists) {
      displayStoredLists(parsedLists);
    }
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
