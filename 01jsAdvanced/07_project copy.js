class TaskManager {
  constructor() {
    this.tasks = [];
  }
  addTask(title) {
    const task = { id: Date.now(), title };
    this.tasks.push(task);
    console.log(`Task "${title}" added.`);
  }
  removeTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    console.log(`Task with id ${id} removed.`);
  }
  listTasks() {
    console.log("Tasks:", this.tasks);
  }
}

const manager = new TaskManager();
manager.addTask("Learn JS");
manager.addTask("Build Project");
manager.listTasks();

const firstId = manager.tasks[0].id;
manager.removeTask(firstId);
manager.listTasks();