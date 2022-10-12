import { useCallback, useState } from 'react';
import { ResourceId } from 'services/Storage';
import { Task } from '../../types';

export type SetFocusFn = (taskId: ResourceId) => void;
export type ClearFocusFn = () => void;
export type OnBlurTaskFn = (task: Task) => void;
export type OnFocusTaskFn = (task: Task) => void;

export type UseFocusedTaskTrackerReturn = {
  focusedTaskId: ResourceId | undefined;
  setFocus: SetFocusFn;
  clearFocus: ClearFocusFn;
  onBlurTask: OnBlurTaskFn;
  onFocusTask: OnFocusTaskFn;
};

export const useFocusedTaskTracker = (): UseFocusedTaskTrackerReturn => {
  const [focusedTaskId, setFocusedTaskId] = useState<ResourceId>();

  const setFocus = useCallback<SetFocusFn>((taskId) => {
    setFocusedTaskId(taskId);
  }, []);

  const clearFocus = useCallback<ClearFocusFn>(() => {
    setFocusedTaskId(undefined);
  }, []);

  const onBlurTask = useCallback<OnBlurTaskFn>((task) => {
    setFocusedTaskId((prev) => (prev === task.id ? undefined : prev));
  }, []);
  const onFocusTask = useCallback<OnFocusTaskFn>(
    (task) => setFocus(task.id),
    [setFocus],
  );

  return {
    focusedTaskId,
    setFocus,
    clearFocus,
    onBlurTask,
    onFocusTask,
  };
};
