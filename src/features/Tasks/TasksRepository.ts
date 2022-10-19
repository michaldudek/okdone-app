import { calculateOrder } from 'features/Tasks/utils/order';
import { In, Repository } from 'services/Storage';
import { todayToDateString } from 'types/DateString';
import { Task } from './types';

export type CreateOptions = {
  taskBefore?: Task;
  taskAfter?: Task;
};

export class TasksRepository extends Repository<Task> {
  public async create(
    data: Partial<Task>,
    { taskBefore, taskAfter }: CreateOptions = {},
  ): Promise<Task> {
    return super.create({
      ...data,
      order: calculateOrder(taskBefore, taskAfter),
      completedAt: null,
      completedDate: null,
    });
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
