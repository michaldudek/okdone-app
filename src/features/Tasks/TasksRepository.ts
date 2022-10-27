import { In, Repository } from 'services/Storage';
import { todayToDateString } from 'types/DateString';
import { Task } from './types';
import { calculateOrder } from './utils/order';

export type PrepareOptions = {
  taskBefore?: Task;
  taskAfter?: Task;
};

export class TasksRepository extends Repository<Task> {
  public prepare(
    data: Partial<Task>,
    { taskBefore, taskAfter }: PrepareOptions = {},
  ): Task {
    return super.prepare({
      order: calculateOrder(taskBefore, taskAfter),
      completedAt: null,
      completedDate: null,
      ...data,
    });
  }

  public async create(
    data: Partial<Task>,
    options?: PrepareOptions,
  ): Promise<Task> {
    const task = this.prepare(data, options);
    return super.create(task);
  }

  public async findToday(): Promise<Task[]> {
    return this.find({
      where: {
        completedDate: In(todayToDateString(), null),
      },
      orderBy: 'order',
      orderDir: 'asc',
    });
  }
}
