class List {
  constructor(title) {
    this.title = title;
    this.id = Date.now();
    this.tasks = [];
    this.urgent = false;
  }

  updateTitle(taskInput) {
    list.title = `${titleInput.value}`
  }

  updateListTasks(task) {
    this.tasks.push(task)
  }

  saveToStorage(list, lists) {
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
