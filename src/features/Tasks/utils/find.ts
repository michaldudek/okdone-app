import { Task } from '../types';

export const findTaskBefore = (
  tasks: Task[],
  current: Task,
): Task | undefined => {
  const currIndex = tasks.findIndex(({ id }) => id === current.id);
  if (currIndex <= 0) {
    return;
  }

  return tasks[currIndex - 1];
};

export const findTaskAfter = (
  tasks: Task[],
  current: Task,
): Task | undefined => {
  const currIndex = tasks.findIndex(({ id }) => id === current.id);
  if (currIndex === -1) {
    return;
  }

  return tasks[currIndex + 1];
};

export const findFirstTask = (tasks: Task[]): Task | undefined => {
  return tasks[0];
};

export const findLastTask = (tasks: Task[]): Task | undefined => {
  return tasks[tasks.length - 1];
};
