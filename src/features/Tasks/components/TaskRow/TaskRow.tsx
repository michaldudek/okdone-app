import {
  FunctionComponent,
  KeyboardEventHandler,
  memo,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import { ToggleOpenTaskFn } from '../../containers/TaskList/useOpenTaskTracker';
import {
  DeleteTaskFn,
  SetTaskCompletedFn,
  UpdateTaskFn,
} from '../../hooks/useTasksList';
import { Task } from '../../types';
import { taskStatus } from '../../utils/taskStatus';
import { TaskRowCheckbox } from './TaskRowCheckbox';
import { TaskRowContainer } from './TaskRowContainer';
import { TaskRowFooter } from './TaskRowFooter';
import { TaskRowHeader } from './TaskRowHeader';
import { TaskRowTitle } from './TaskRowTitle';

type Props = {
  task: Task;
  isOpen?: boolean;
  onToggleOpen?: ToggleOpenTaskFn;

  setTaskCompleted: SetTaskCompletedFn;
  updateTask: UpdateTaskFn;
  deleteTask: DeleteTaskFn;
};

export const TaskRow: FunctionComponent<Props> = memo(
  ({
    task,
    isOpen,
    onToggleOpen,
    setTaskCompleted,
    updateTask,
    deleteTask,
  }) => {
    const [isTitleFocused, setTitleFocused] = useState(false);

    const { title, completedDate } = task;
    const isCompleted = !!completedDate;

    const handleKeyDown = useCallback<KeyboardEventHandler>(
      (event) => {
        switch (event.key) {
          case ' ':
          case 'Space':
            setTaskCompleted(task, !isCompleted);
            break;

          case 'Enter':
            if (event.shiftKey) {
              onToggleOpen?.(task);
            }
            break;

          case 'Escape':
            onToggleOpen?.(task, false);
            break;

          case 'Backspace':
            deleteTask(task.id);
            break;
        }

        if (event.key.match(/^[\w_£§!@#$%^&*()_=+{}[\];:'"|\\~`,./<>?-]{1}$/)) {
          setTitleFocused(true);
        }
      },
      [setTaskCompleted, task, isCompleted, deleteTask, onToggleOpen],
    );

    const handleDoubleClick = useCallback<MouseEventHandler>(
      (event) => {
        event.preventDefault();
        onToggleOpen?.(task, true);
      },
      [onToggleOpen, task],
    );

    const handleChange = (newTitle: string) => {
      updateTask({
        id: task.id,
        title: newTitle,
      });
    };

    const handleTitleBlur = () => setTitleFocused(false);

    return (
      <TaskRowContainer
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
