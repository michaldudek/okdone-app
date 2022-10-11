import { Task, TaskStatus } from '../types';

export const taskStatus = (task: Task): TaskStatus =>
  task.completedAt ? 'completed' : 'todo';
