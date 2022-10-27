import { useQuery } from '@tanstack/react-query';
import { getRepository } from 'services/Storage';
import { TasksRepository } from '../TasksRepository';
import { Task, TASK_RESOURCE_NAME } from '../types';

type UseTasksList = () => {
  tasks: Task[];
  error: unknown | undefined;
  isLoading: boolean;
};

export const TASKS_LIST_QUERY_NAME = [TASK_RESOURCE_NAME];

/**
 * Fetch a tasks list from the backend.
 */
export const useTasksList: UseTasksList = () => {
  const repository = getRepository<Task, TasksRepository>(TASK_RESOURCE_NAME);

  const { data, isLoading, error } = useQuery<Task[]>(
    TASKS_LIST_QUERY_NAME,
    () => repository.findToday(),
  );

  return {
    tasks: data ?? [],
    error,
    isLoading,
  };
};
