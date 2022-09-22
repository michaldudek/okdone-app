import { ResourceId } from 'services/Storage';

export type Task = {
  id: ResourceId;
  name: string;
  createdAt: Date;
  completedAt?: Date;
};

export type NewTask = Omit<Task, 'id' | 'completedAt'>;
