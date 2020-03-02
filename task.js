class Task {
  constructor(title) {
    this.title = title;
    this.id = Date.now();
    this.checked = false;
  }
}