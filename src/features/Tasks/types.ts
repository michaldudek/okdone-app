export type Task = {
  id: string;
  name: string;
  createdAt: Date;
  completedAt?: Date;
};

export type NewTask = Omit<Task, 'id' | 'completedAt'>;
