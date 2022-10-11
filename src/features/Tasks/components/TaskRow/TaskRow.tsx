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
import { SetTaskCompletedFn, UpdateTaskFn } from '../../hooks/useTasksList';
import { TaskRowTitle } from '../../TaskRowTitle';
import { Task } from '../../types';
import { taskStatus } from '../../utils/taskStatus';
import { TaskRowCheckbox } from './TaskRowCheckbox';
import { TaskRowContainer } from './TaskRowContainer';

type Props = {
  task: Task;
  setTaskCompleted: SetTaskCompletedFn;
  updateTask: UpdateTaskFn;
};

export const TaskRow: FunctionComponent<Props> = memo(
  ({ setTaskCompleted, updateTask, task }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setOpen] = useState(false);

    const { name, completedDate } = task;
    const isCompleted = !!completedDate;

    useOnClickOutside(() => setOpen(false), containerRef);

    console.log('TaskRow', name);

    const handleKeyDown = useCallback<KeyboardEventHandler>(
      ({ key }) => {
        switch (key) {
          case ' ':
          case 'Space':
            setTaskCompleted(task, !isCompleted);
            break;

          // TODO find better key
          // case 'Enter':
          //   setOpen(true);
          //   break;

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

    const handleChange = (newTitle: string) => {
      updateTask({
        id: task.id,
        name: newTitle,
      });
    };

    return (
      <TaskRowContainer
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleDoubleClick}
        aria-expanded={isOpen}
        data-status={taskStatus(task)}
      >
        <TaskRowCheckbox
          tabIndex={-1}
          checked={isCompleted}
          onCheckedChange={(checked) =>
            setTaskCompleted(task, Boolean(checked))
          }
        />
        <TaskRowTitle onChange={handleChange} data-status={taskStatus(task)}>
          {name}
        </TaskRowTitle>
      </TaskRowContainer>
    );
  },
);
