import { TASK_RESOURCE_NAME } from 'features/Tasks/types';
import { indexedDb, registerRepository } from 'services/Storage';
import { TasksRepository } from './TasksRepository';

export * from './containers/TaskList';
export * from './types';
export * from './utils/taskStatus';

registerRepository(
  TASK_RESOURCE_NAME,
  new TasksRepository(
    TASK_RESOURCE_NAME,
    indexedDb.registerResource(TASK_RESOURCE_NAME, 7, {}, ['completedDate']),
  ),
);
