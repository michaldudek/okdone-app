import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRepository } from 'services/Storage';
import { NewTask, Task, TASK_RESOURCE_NAME } from '../types';

type UseTasksListReturnType = {
  tasks: Task[] | undefined;
  addTask: (data: NewTask) => Promise<Task>;
  error: unknown | undefined;
  isLoading: boolean;
};

export const useTasksList = (): UseTasksListReturnType => {
  const repository = getRepository<Task>(TASK_RESOURCE_NAME);

  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<Task[]>([TASK_RESOURCE_NAME], () => repository.find());

  const { mutateAsync: addTask } = useMutation(
    (newTask: NewTask) => repository.create(newTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TASK_RESOURCE_NAME]);
      },
    },
  );

  return {
    tasks,
    addTask,
    error,
    isLoading,
  };
};
