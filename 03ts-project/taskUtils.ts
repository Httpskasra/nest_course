import { Task, TaskStats, TaskStatus } from "./types";

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter(t => t.status === status);
}

export function findTaskById(tasks: Task[], id: number): Task | undefined {
  return tasks.find(t => t.id === id);
}

export function getStats(tasks: Task[]): TaskStats {
  return tasks.reduce(
    (acc, t) => {
      acc.total++;
      if (t.status === "done") acc.completed++;
      else acc.pending++;
      return acc;
    },
    { total: 0, completed: 0, pending: 0 }
  );
}

export function mapToTitles(tasks: Task[]): string[] {
  return tasks.map(t => t.title);
}