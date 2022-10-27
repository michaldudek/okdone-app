import { PartialWithId, ResourceId } from 'services/Storage';
import { Task } from '../types';

export const findTask = (
  tasks: Task[],
  id?: ResourceId,
): [Task | undefined, number] => {
  if (!id) {
    return [undefined, -1];
  }

  const index = tasks.findIndex((task) => task.id === id);
  return [tasks[index], index];
};

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

export const replaceTask = (
  tasks: Task[],
  newTask: PartialWithId<Task>,
  altId?: ResourceId,
): { tasks: Task[]; prevTask: Task; newTask: PartialWithId<Task> } => {
  const [task, taskIndex] = findTask(tasks, altId ?? newTask.id);
  if (!task) {
    throw new Error('Could not replace task because it was not found');
  }

  tasks[taskIndex] = { ...task, ...newTask };

  return { tasks, prevTask: task, newTask };
};
