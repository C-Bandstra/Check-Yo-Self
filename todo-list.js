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

  saveToStorage() {
    lists.push(this);
    var stringedLists = JSON.stringify(lists);
    localStorage.setItem('lists', stringedLists);
  }
  
  deleteFromStorage() {
    var stringedLists = JSON.stringify(lists);
    localStorage.setItem('lists', stringedLists);
  }

  updateTask(task) {
    task.checked = !task.checked
    var stringedLists = JSON.stringify(lists)
    localStorage.setItem('lists', stringedLists);
  }
}
