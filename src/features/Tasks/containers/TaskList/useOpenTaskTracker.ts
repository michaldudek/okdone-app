import { RefObject, useCallback, useState } from 'react';
import { ResourceId } from 'services/Storage';
import { useOnClickOutside } from 'utils/useOnClickOutside';
import { Task } from '../../types';

export type ToggleOpenTaskFn = (task: Task, open?: boolean) => void;
export type UseOpenTaskTrackerReturn = [
  ResourceId | undefined,
  ToggleOpenTaskFn,
];

export const useOpenTaskTracker = (
  listRef: RefObject<HTMLUListElement>,
): UseOpenTaskTrackerReturn => {
  const [openTaskId, setOpenTaskId] = useState<ResourceId>();

  useOnClickOutside(() => setOpenTaskId(undefined), listRef);

  const toggleOpenTask = useCallback<ToggleOpenTaskFn>(
    (task: Task, open?: boolean) => {
      if (open === undefined) {
        setOpenTaskId((prev) => (prev === task.id ? undefined : task.id));
        return;
      }

      setOpenTaskId(open ? task.id : undefined);
    },
    [],
  );

  return [openTaskId, toggleOpenTask];
};
