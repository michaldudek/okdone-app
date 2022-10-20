import { useCallback, useState } from 'react';
import { ResourceId } from 'services/Storage';
import { Task } from '../../types';

export type SetFocusedTaskFn = (taskId: ResourceId) => void;
export type ClearFocusedTaskFn = () => void;
export type OnBlurTaskFn = (task: Task) => void;
export type OnFocusTaskFn = (task: Task) => void;

export type UseFocusedTaskTrackerReturn = {
  focusedTaskId: ResourceId | null;
  setFocusedTask: SetFocusedTaskFn;
  clearFocusedTask: ClearFocusedTaskFn;
  onBlurTask: OnBlurTaskFn;
  onFocusTask: OnFocusTaskFn;
};

export const useFocusedTaskTracker = (): UseFocusedTaskTrackerReturn => {
  const [focusedTaskId, setFocusedTaskId] = useState<ResourceId | null>(null);

  const setFocusedTask = useCallback<SetFocusedTaskFn>((taskId) => {
    setFocusedTaskId(taskId);
  }, []);

  const clearFocusedTask = useCallback<ClearFocusedTaskFn>(() => {
    setFocusedTaskId(null);
  }, []);

  const onBlurTask = useCallback<OnBlurTaskFn>((task) => {
    setFocusedTaskId((prev) => (prev === task.id ? null : prev));
  }, []);

  const onFocusTask = useCallback<OnFocusTaskFn>(
    (task) => setFocusedTask(task.id),
    [setFocusedTask],
  );

  return {
    focusedTaskId,
    setFocusedTask,
    clearFocusedTask,
    onBlurTask,
    onFocusTask,
  };
};
