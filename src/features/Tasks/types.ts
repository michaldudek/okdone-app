import { ResourceId } from 'services/Storage';

export const TASK_RESOURCE_NAME = 'tasks';

export type Task = {
  id: ResourceId;
  name: string;
  createdAt: Date;
  completedAt?: Date;
};

export type NewTask = Omit<Task, 'id' | 'completedAt'>;
