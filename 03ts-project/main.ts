import { TaskManager } from "./TaskManager";
import { filterByStatus, mapToTitles } from "./taskUtils";
import { TaskStatus, TaskPriority } from "./types";

async function run() {
  const manager = new TaskManager();

  await manager.loadInitialTasks();
  console.log("Initial tasks:", manager.getAll());

  await manager.addTask("Write Tests", TaskPriority.High);
  await manager.updateStatus(2, "done");

  // استفاده از Partial update
  await manager.updateTask(3, { title: "Build advanced project" });

  const allTasks = manager.getAll();
  console.log("All titles:", mapToTitles(allTasks));
  console.log("Todo tasks:", filterByStatus(allTasks, "todo"));
  manager.printStats();

  // نمایش Destructuring
  const [first, ...rest] = allTasks;
  console.log("First task:", first);
}

run().catch(console.error);