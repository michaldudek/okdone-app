import {
  FunctionComponent,
  KeyboardEvent,
  KeyboardEventHandler,
  memo,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Task } from '../../types';
import { taskStatus } from '../../utils/taskStatus';
import { TaskRowCheckbox } from './TaskRowCheckbox';
import { TaskRowContainer } from './TaskRowContainer';
import { TaskRowFooter } from './TaskRowFooter';
import { TaskRowHeader } from './TaskRowHeader';
import { TaskRowTitle } from './TaskRowTitle';

const isWriting = (key: string) =>
  /^[\w_£§!@#$%^&*()_=+{}[\];:'"|\\~`,./<>?-]{1}$/.test(key);

type Props = {
  task: Task;
  isOpen?: boolean;
  isFocused?: boolean;
  onBlur?: (task: Task) => void;
  onChange?: (task: Task, change: Partial<Task>) => void;
  onCompleted?: (task: Task, complete?: boolean) => void;
  onDoubleClick?: (task: Task, event: MouseEvent) => void;
  onFocus?: (task: Task) => void;
  onKeyDown?: (task: Task, event: KeyboardEvent) => void;
};

export const TaskRow: FunctionComponent<Props> = memo(
  ({
    isFocused = false,
    isOpen = false,
    onBlur,
    onChange,
    onCompleted,
    onDoubleClick,
    onFocus,
    onKeyDown,
    task,
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isTitleFocused, setTitleFocused] = useState(false);

    const { title, completedDate } = task;
    const isCompleted = !!completedDate;

    useEffect(() => {
      if (isFocused && ref.current) {
        ref.current.focus();
      }
    }, [isFocused]);

    const handleKeyDown = useCallback<KeyboardEventHandler>(
      (event) => {
        onKeyDown?.(task, event);

        if (isFocused && isWriting(event.key)) {
          setTitleFocused(true);
        }
      },
      [isFocused, onKeyDown, task],
    );

    const handleDoubleClick = useCallback<MouseEventHandler>(
      (event) => {
        event.preventDefault();
        onDoubleClick?.(task, event);
      },
      [onDoubleClick, task],
    );

    const handleChange = useCallback(
      (title: string) => onChange?.(task, { title }),
      [onChange, task],
    );

    const handleTitleBlur = () => setTitleFocused(false);

    const handleBlur = useCallback(() => onBlur?.(task), [onBlur, task]);
    const handleFocus = useCallback(() => onFocus?.(task), [onFocus, task]);

    return (
      <TaskRowContainer
        ref={ref}
        tabIndex={0}
        onBlur={handleBlur}
        onDoubleClick={handleDoubleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        data-status={taskStatus(task)}
      >
        <TaskRowHeader>
          <TaskRowCheckbox
            tabIndex={-1}
            checked={isCompleted}
            onCheckedChange={(checked) => onCompleted?.(task, Boolean(checked))}
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
