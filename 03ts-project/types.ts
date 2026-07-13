export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  createdAt: Date;
}

export type TaskStatus = "todo" | "in-progress" | "done";

export enum TaskPriority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}