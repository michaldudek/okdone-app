import { Task, TASK_RESOURCE_NAME } from 'features/Tasks/types';
import { indexedDb, registerRepository, Repository } from 'services/Storage';

export * from './containers/TasksView';
export * from './types';

registerRepository(
  TASK_RESOURCE_NAME,
  new Repository<Task>(
    TASK_RESOURCE_NAME,
    indexedDb.registerResource(TASK_RESOURCE_NAME, 6, {}, ['createdAt']),
  ),
);
