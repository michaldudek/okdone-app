import { ResourceKey } from 'services/Storage';

export type Task = {
  id: ResourceKey;
  name: string;
  createdAt: Date;
  completedAt?: Date;
};

export type NewTask = Omit<Task, 'id' | 'completedAt'>;
