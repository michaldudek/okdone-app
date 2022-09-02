import { tasks } from '../storage/tasks';
import { Task } from '../types';

type UseTasksListReturnType = {
  tasks: Task[];
};

export const useTasksList = (): UseTasksListReturnType => {
  return { tasks };
};
