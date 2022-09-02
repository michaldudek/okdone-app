import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { tasks } from '../storage/tasks';
import { NewTask } from '../types';

export type AddTaskFn = (task: NewTask) => void;

export const useAddTask = (): AddTaskFn => {
  const addTask = useCallback<AddTaskFn>((task) => {
    tasks.push({
      id: uuid(),
      ...task,
    });
  }, []);

  return addTask;
};
