import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TasksRepository } from 'features/Tasks/TasksRepository';
import { useCallback } from 'react';
import { getRepository, PartialWithId, ResourceId } from 'services/Storage';
import { todayToDateString } from 'types/DateString';
import { NewTask, Task, TASK_RESOURCE_NAME } from '../types';

export type AddTaskFn = (data: NewTask) => Promise<Task>;
export type UpdateTaskFn = (data: PartialWithId<Task>) => Promise<Task>;
export type DeleteTaskFn = (id: ResourceId) => Promise<void>;
export type SetTaskCompletedFn = (
  task: Task,
  complete?: boolean,
) => Promise<Task>;

type UseTasksListReturnType = {
  tasks: Task[] | undefined;
  addTask: AddTaskFn;
  updateTask: UpdateTaskFn;
  deleteTask: DeleteTaskFn;
  setTaskCompleted: SetTaskCompletedFn;
  error: unknown | undefined;
  isLoading: boolean;
};

export const useTasksList = (): UseTasksListReturnType => {
  const repository = getRepository<Task, TasksRepository>(TASK_RESOURCE_NAME);

  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<Task[]>([TASK_RESOURCE_NAME], () => repository.findToday());

  const { mutateAsync: addTask } = useMutation(
    (newTask: NewTask) => repository.create(newTask),
    {
      // TODO optimistic updates when we connect to an API over the network
      onSuccess: () => {
        queryClient.invalidateQueries([TASK_RESOURCE_NAME]);
      },
    },
  );

  const { mutateAsync: updateTask } = useMutation(
    (data: PartialWithId<Task>) => repository.update(data.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TASK_RESOURCE_NAME]);
      },
    },
  );

  const { mutateAsync: deleteTask } = useMutation(
    (id: ResourceId) => repository.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TASK_RESOURCE_NAME]);
      },
    },
  );

  const setTaskCompleted = useCallback(
    async (task: Task, complete = true) =>
      updateTask({
        id: task.id,
        completedAt: complete ? new Date() : null,
        completedDate: complete ? todayToDateString() : null,
      }),
    [updateTask],
  );

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    setTaskCompleted,
    error,
    isLoading,
  };
};
