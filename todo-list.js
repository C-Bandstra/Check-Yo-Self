class List {
  constructor(title, id, tasks, urgent) {
    this.title = title;
    this.id = id || Date.now();
    this.tasks = tasks || [];
    this.urgent = urgent || false;
  }

  updateTitle() {
    this.title = `${titleInput.value}`;
  }

  updateListTasks(task) {
    this.tasks.push(task);
  }

  saveToStorage() {
    var stringedLists = JSON.stringify(lists);
    localStorage.setItem('lists', stringedLists);
  }

  updateTask(task) {
    task.checked = !task.checked
    this.saveToStorage();
  }
}
