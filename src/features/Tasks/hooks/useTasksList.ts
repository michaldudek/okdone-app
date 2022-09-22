import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useStorage } from 'services/Storage';
import { NewTask, Task } from '../types';

const RESOURCE_NAME = 'tasks';

type UseTasksListReturnType = {
  tasks: Task[] | undefined;
  addTask: (data: NewTask) => Promise<Task>;
  error: unknown | undefined;
  isLoading: boolean;
};

export const useTasksList = (): UseTasksListReturnType => {
  const storage = useStorage();

  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<Task[]>([RESOURCE_NAME], () =>
    storage.list<Task>(RESOURCE_NAME),
  );

  const { mutateAsync: addTask } = useMutation(
    (newTask: NewTask) => storage.create<Task>(RESOURCE_NAME, newTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([RESOURCE_NAME]);
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
