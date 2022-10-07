import { In, Repository } from 'services/Storage';
import { todayToDateString } from 'types/DateString';
import { Task } from './types';

export class TasksRepository extends Repository<Task> {
  public async create(data: Partial<Task>): Promise<Task> {
    return super.create({
      ...data,
      completedAt: null,
      completedDate: null,
    });
  }

  public async findToday(): Promise<Task[]> {
    return this.find({
      where: {
        completedDate: In(todayToDateString(), null),
      },
      orderBy: 'createdAt',
      orderDir: 'asc',
    });
  }
}