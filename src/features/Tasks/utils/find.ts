import { Task } from '../types';

export const findNextTask = (
  tasks: Task[],
  current: Task,
): Task | undefined => {
  const currIndex = tasks.findIndex(({ id }) => id === current.id);
  if (currIndex === -1) {
    return;
  }

  return tasks[currIndex + 1];
};

export const findPrevTask = (
  tasks: Task[],
  current: Task,
): Task | undefined => {
  const currIndex = tasks.findIndex(({ id }) => id === current.id);
  if (currIndex <= 0) {
    return;
  }

  return tasks[currIndex - 1];
};
