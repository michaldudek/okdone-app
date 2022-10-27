import { Resource } from 'services/Storage';
import { DateString } from 'types/DateString';
import { PrepareOptions } from './TasksRepository';

export const TASK_RESOURCE_NAME = 'tasks';

export type Task = Resource & {
  title: string;
  order: number;
  notes?: string | null;
  completedAt: Date | null;
  completedDate: DateString | null;
};

export type NewTask = Partial<Omit<Task, 'id'>> &
  Pick<Task, 'title'> &
  PrepareOptions;

export type TaskStatus = 'completed' | 'todo';
