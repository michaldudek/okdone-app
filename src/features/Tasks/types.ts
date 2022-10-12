import { Resource } from 'services/Storage';
import { DateString } from 'types/DateString';

export const TASK_RESOURCE_NAME = 'tasks';

export type Task = Resource & {
  title: string;
  order: number;
  completedAt: Date | null;
  completedDate: DateString | null;
};

export type NewTask = Partial<Omit<Task, 'id'>> & Pick<Task, 'title'>;

export type TaskStatus = 'completed' | 'todo';
