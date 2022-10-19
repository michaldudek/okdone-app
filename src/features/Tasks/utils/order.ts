import { Task } from '../types';

const ORDER_INTERVAL = Math.pow(2, 16);

export const calculateOrder = (taskBefore?: Task, taskAfter?: Task): number => {
  // adding to empty list
  if (!taskBefore && !taskAfter) {
    return ORDER_INTERVAL;
  }

  // adding at the end of the list
  if (taskBefore && !taskAfter) {
    return taskBefore.order + ORDER_INTERVAL;
  }

  // adding in between two tasks
  const beforeOrder = taskBefore?.order ?? 0;
  const afterOrder = taskAfter?.order ?? 0;
  return (beforeOrder + afterOrder) / 2;
};
