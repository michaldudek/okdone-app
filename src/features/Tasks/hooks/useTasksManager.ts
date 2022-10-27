import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getRepository, PartialWithId, ResourceId } from 'services/Storage';
import { todayToDateString } from 'types/DateString';
import { TasksRepository } from '../TasksRepository';
import { NewTask, Task, TASK_RESOURCE_NAME } from '../types';
import { findTask, replaceTask } from '../utils/find';
import { TASKS_LIST_QUERY_NAME } from './useTasksList';

type PartialTask = PartialWithId<Task>;
type AddContext = { task?: Task; taskIndex?: number };
type UpdateContext = { prevTask?: Task; newTask?: PartialTask };

export type AddTaskFn = (data: NewTask) => Promise<Task>;
export type UpdateTaskFn = (data: PartialTask) => Promise<Task>;
export type DeleteTaskFn = (id: ResourceId) => Promise<void>;
export type SetTaskCompletedFn = (
  task: Task,
  complete?: boolean,
) => Promise<Task>;

type UseTasksManager = () => {
  addTask: AddTaskFn;
  updateTask: UpdateTaskFn;
  deleteTask: DeleteTaskFn;
  setTaskCompleted: SetTaskCompletedFn;
};

/**
 * Manipulate tasks.
 */
export const useTasksManager: UseTasksManager = () => {
  const repository = getRepository<Task, TasksRepository>(TASK_RESOURCE_NAME);

  const queryClient = useQueryClient();

  /**
   * Get cached tasks list directly.
   */
  const getQueryData = () =>
    queryClient.getQueryData<Task[]>(TASKS_LIST_QUERY_NAME) ?? [];
  /**
   * Set cached tasks list (e.g. for optimistic updates).
   */
  const setQueryData = (tasks: Task[]) =>
    queryClient.setQueryData(TASKS_LIST_QUERY_NAME, tasks);

  /**
   * Add task.
   */
  const { mutateAsync: addTask } = useMutation(
    ({ taskBefore, taskAfter, ...newTask }: NewTask) =>
      repository.create(newTask, { taskBefore, taskAfter }),
    {
      /**
       * Optimistically insert the new task to the list where it should be and
       * update the query cache.
       */
      onMutate: async ({ taskBefore, taskAfter, ...newTask }) => {
        await queryClient.cancelQueries(TASKS_LIST_QUERY_NAME);

        const tasks = getQueryData();
        const task = repository.prepare(newTask, { taskBefore, taskAfter });
        const [, taskIndex] = findTask(tasks, taskBefore?.id);

        // if taskBefore was not found then the list was most likely empty
        if (taskIndex === -1) {
          setQueryData([task]);
          return { taskIndex: 0, task };
        }

        const newIndex = (taskIndex ?? 0) + 1;
        tasks.splice(newIndex, 0, task);

        setQueryData(tasks);

        return { taskIndex: newIndex, task };
      },
      /**
       * When error occured in the backend, then remove the newly added task.
       *
       * TODO maybe instead we should mark it with an error and show in UI that it failed to synch?
       */
      onError: (error, data, { taskIndex }: AddContext = {}) => {
        const tasks = getQueryData();
        if (taskIndex === undefined) {
          return;
        }

        tasks.splice(taskIndex, 1);
        setQueryData(tasks);
      },
      /**
       * When successfully stored, update the cache with the version from the
       * backend to ensure consistency.
       */
      onSuccess: async (result, data, { taskIndex, task }: AddContext = {}) => {
        if (taskIndex === undefined) {
          return;
        }

        const tasks = getQueryData();
        tasks[taskIndex] = result;
        setQueryData(tasks);
      },
    },
  );

  /**
   * Update task.
   */
  const { mutateAsync: updateTask } = useMutation(
    (data: PartialTask) => repository.update(data.id, data),
    {
      /**
       * Optimistically update the task in the query cache.
       */
      onMutate: async (newTask) => {
        await queryClient.cancelQueries(TASKS_LIST_QUERY_NAME);

        const tasks = getQueryData();

        try {
          const { tasks: newTasks, prevTask } = replaceTask(tasks, newTask);
          setQueryData(newTasks);
          return { prevTask, newTask };
        } catch {
          return {};
        }
      },
      /**
       * When error occured in the backend, restore the task to its previous
       * state.
       *
       * TODO maybe instead we should mark it with an error and show in UI that it failed to synch?
       */
      onError: async (error, data, { prevTask }: UpdateContext = {}) => {
        if (!prevTask) {
          return;
        }
        const tasks = getQueryData();
        try {
          const { tasks: newTasks } = replaceTask(tasks, prevTask);
          setQueryData(newTasks);
        } catch {
          return;
        }
      },
    },
  );

  /**
   * Delete task.
   */
  const { mutateAsync: deleteTask } = useMutation(
    (id: ResourceId) => repository.delete(id),
    {
      /**
       * Optimistically remove the task from the list and update the query cache.
       */
      onMutate: async (id: ResourceId) => {
        await queryClient.cancelQueries(TASKS_LIST_QUERY_NAME);
        const tasks = getQueryData();

        const [, index] = findTask(tasks, id);
        if (index === -1) {
          return;
        }

        tasks.splice(index, 1);
        setQueryData(tasks);
      },
    },
  );

  /**
   * Set task completed.
   */
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
    addTask,
    updateTask,
    deleteTask,
    setTaskCompleted,
  };
};
