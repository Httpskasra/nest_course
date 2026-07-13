export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface ErrorWithStatus extends Error {
  statusCode?: number;
}