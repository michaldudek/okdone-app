import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useStorage } from 'services/Storage';
import { NewTask, Task } from '../types';

const RESOURCE = 'tasks';

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
  } = useQuery<Task[]>([RESOURCE], () => storage.list<Task>(RESOURCE));

  const { mutateAsync: addTask } = useMutation(
    (newTask: NewTask) => storage.create(RESOURCE, newTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([RESOURCE]);
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
