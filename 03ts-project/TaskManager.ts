import { Task, TaskStatus, TaskPriority } from "./types";
import { findTaskById, getStats } from "./taskUtils";

// یک کلاس Generic برای مدیریت آیتم‌ها (اختیاری)
class Store<T> {
  private items: T[] = [];
  add(item: T): void {
    this.items.push(item);
  }
  getAll(): T[] {
    return this.items;
  }
}

export class TaskManager {
  private tasks: Task[] = [];

  // بارگذاری اولیه (شبیه‌سازی async)
  async loadInitialTasks(): Promise<Task[]> {
    // تأخیر ساختگی
    await new Promise(res => setTimeout(res, 500));
    this.tasks = [
      { id: 1, title: "Learn JS", status: "done", createdAt: new Date() },
      { id: 2, title: "Learn TS", status: "in-progress", createdAt: new Date() },
      { id: 3, title: "Build project", status: "todo", createdAt: new Date() },
    ];
    return this.tasks;
  }

  async addTask(title: string, priority: TaskPriority = TaskPriority.Medium): Promise<Task> {
    const newTask: Task = {
      id: Date.now(),
      title,
      status: "todo",
      createdAt: new Date(),
    };
    this.tasks.push(newTask);
    console.log(`Task added: ${title} with priority ${priority}`);
    return newTask;
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task | undefined> {
    const task = findTaskById(this.tasks, id);
    if (task) task.status = status;
    return task;
  }

  // استفاده از Partial برای آپدیت جزئی
  async updateTask(id: number, changes: Partial<Omit<Task, "id">>): Promise<Task | undefined> {
    const task = findTaskById(this.tasks, id);
    if (task) Object.assign(task, changes);
    return task;
  }

  getAll(): Task[] {
    return this.tasks;
  }

  printStats(): void {
    const stats = getStats(this.tasks);
    console.log(`Total: ${stats.total}, Completed: ${stats.completed}, Pending: ${stats.pending}`);
  }
}