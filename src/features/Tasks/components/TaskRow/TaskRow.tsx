import { TaskRowFooter } from 'features/Tasks/components/TaskRow/TaskRowFooter';
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
import {
  DeleteTaskFn,
  SetTaskCompletedFn,
  UpdateTaskFn,
} from '../../hooks/useTasksList';
import { TaskRowTitle } from '../../TaskRowTitle';
import { Task } from '../../types';
import { taskStatus } from '../../utils/taskStatus';
import { TaskRowCheckbox } from './TaskRowCheckbox';
import { TaskRowContainer } from './TaskRowContainer';
import { TaskRowHeader } from './TaskRowHeader';

type Props = {
  task: Task;
  setTaskCompleted: SetTaskCompletedFn;
  updateTask: UpdateTaskFn;
  deleteTask: DeleteTaskFn;
};

export const TaskRow: FunctionComponent<Props> = memo(
  ({ setTaskCompleted, updateTask, deleteTask, task }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setOpen] = useState(false);
    const [isTitleFocused, setTitleFocused] = useState(false);

    const { title, completedDate } = task;
    const isCompleted = !!completedDate;

    useOnClickOutside(() => setOpen(false), containerRef);

    const handleKeyDown = useCallback<KeyboardEventHandler>(
      (event) => {
        switch (event.key) {
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

          case 'Backspace':
            deleteTask(task.id);
            break;
        }

        if (event.key.match(/^[\w_£§!@#$%^&*()_=+{}[\];:'"|\\~`,./<>?-]{1}$/)) {
          setTitleFocused(true);
        }
      },
      [isCompleted, setTaskCompleted, deleteTask, task],
    );

    const handleDoubleClick = useCallback<MouseEventHandler>((event) => {
      event.preventDefault();
      setOpen(true);
    }, []);

    const handleChange = (newTitle: string) => {
      updateTask({
        id: task.id,
        title: newTitle,
      });
    };

    const handleTitleBlur = () => setTitleFocused(false);

    return (
      <TaskRowContainer
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleDoubleClick}
        aria-expanded={isOpen}
        data-status={taskStatus(task)}
      >
        <TaskRowHeader>
          <TaskRowCheckbox
            tabIndex={-1}
            checked={isCompleted}
            onCheckedChange={(checked) =>
              setTaskCompleted(task, Boolean(checked))
            }
          />
          <TaskRowTitle
            isFocused={isTitleFocused}
            onBlur={handleTitleBlur}
            onChange={handleChange}
            data-status={taskStatus(task)}
          >
            {title}
          </TaskRowTitle>
        </TaskRowHeader>
        {isOpen && <TaskRowFooter task={task} />}
      </TaskRowContainer>
    );
  },
);
