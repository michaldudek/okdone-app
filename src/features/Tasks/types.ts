import { Resource } from 'services/Storage';
import { DateString } from 'types/DateString';

export const TASK_RESOURCE_NAME = 'tasks';

export type Task = Resource & {
  name: string;
  completedAt?: Date | null;
  completedDate?: DateString | null;
};

export type NewTask = Pick<Task, 'name'>;
