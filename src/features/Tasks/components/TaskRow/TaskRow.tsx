import { useOnClickOutside } from 'hooks/useOnClickOutside';
import {
  FunctionComponent,
  KeyboardEventHandler,
  memo,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import { SetTaskCompletedFn } from '../../hooks/useTasksList';
import { Task } from '../../types';
import { TaskRowContainer } from './TaskRowContainer';

type Props = {
  task: Task;
  setTaskCompleted: SetTaskCompletedFn;
};

export const TaskRow: FunctionComponent<Props> = memo(
  ({ setTaskCompleted, task }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);
    const { name, completedDate } = task;
    const isCompleted = !!completedDate;

    useOnClickOutside(() => {
      setOpen(false);
    }, containerRef);

    console.log('TaskRow', name);

    const handleKeyDown = useCallback<KeyboardEventHandler>(
      ({ key }) => {
        switch (key) {
          case ' ':
          case 'Space':
            setTaskCompleted(task, !isCompleted);
            break;

          case 'Enter':
            setOpen(true);
            break;

          case 'Escape':
            setOpen(false);
            break;
        }
      },
      [isCompleted, setTaskCompleted, task],
    );

    const handleDoubleClick = useCallback<MouseEventHandler>((event) => {
      event.preventDefault();
      setOpen(true);
    }, []);

    return (
      <TaskRowContainer
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleDoubleClick}
        aria-expanded={isOpen}
      >
        <span>{name}</span>
        <TaskRowCheckbox
          tabIndex={-1}
          checked={isCompleted}
          onCheckedChange={(checked) =>
            setTaskCompleted(task, Boolean(checked))
          }
        />
      </TaskRowContainer>
    );
  },
);
