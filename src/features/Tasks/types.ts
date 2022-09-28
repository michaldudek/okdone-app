import { Resource } from 'services/Storage';

export const TASK_RESOURCE_NAME = 'tasks';

export type Task = Resource & {
  name: string;
  completedAt?: Date;
};

export type NewTask = Pick<Task, 'name'>;
