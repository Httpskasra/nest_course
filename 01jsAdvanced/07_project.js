class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(title) {
    const task = {
      id: Date.now(),
      title
    };
    this.tasks.push(task);
  }

  removeTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  listTasks() {
    return this.tasks;
  }
}

// استفاده
const manager = new TaskManager();

manager.addTask("Learn JS");
manager.addTask("Build Project");

console.log(manager.listTasks());

manager.removeTask(manager.listTasks()[0].id);

console.log(manager.listTasks());