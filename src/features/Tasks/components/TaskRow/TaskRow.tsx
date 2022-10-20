import {
  ComponentProps,
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
import { TaskRowNotes } from './TaskRowNotes';
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
    const [isTitleFocused, setTitleFocused] =
      useState<ComponentProps<typeof TaskRowTitle>['isFocused']>(false);
    const [isNotesFocused, setNotesFocused] = useState(false);

    const { title, notes, completedDate } = task;
    const isCompleted = !!completedDate;

    useEffect(() => {
      if (isFocused && ref.current) {
        ref.current.focus();
      }
    }, [isFocused]);

    const handleKeyDown = useCallback<KeyboardEventHandler>(
      (event) => {
        if (isFocused && isWriting(event.key)) {
          setTitleFocused('end');
          return;
        }

        switch (event.key) {
          case 'Backspace':
            if (!event.metaKey && !event.ctrlKey) {
              setTitleFocused('end');
              return;
            }
            break;

          case 'ArrowRight':
            setTitleFocused('end');
            break;

          case 'ArrowLeft':
            setTitleFocused('start');
            break;
        }

        onKeyDown?.(task, event);
      },
      [isFocused, onKeyDown, task],
    );

    const handleDoubleClick = useCallback<MouseEventHandler>(
      (event) => {
        event.preventDefault();
        setTitleFocused('end');
        onDoubleClick?.(task, event);
      },
      [onDoubleClick, task],
    );

    const handleTitleChange = useCallback(
      (title: string) => onChange?.(task, { title }),
      [onChange, task],
    );

    const handleTitleFocus = () => {
      setTitleFocused(true);
    };

    const handleTitleBlur = () => {
      setTitleFocused(false);
      // if (isFocused && ref.current) {
      //   ref.current.focus();
      // }
    };

    const handleNotesChange = useCallback(
      (notes: string) => onChange?.(task, { notes }),
      [onChange, task],
    );

    const handleNotesFocus = () => {
      setNotesFocused(true);
    };

    const handleNotesBlur = () => {
      setNotesFocused(false);
      // if (isFocused && ref.current) {
      //   ref.current.focus();
      // }
    };

    const handleBlur = useCallback(() => onBlur?.(task), [onBlur, task]);
    const handleFocus = useCallback(() => onFocus?.(task), [onFocus, task]);
    const handleClick = handleFocus;

    return (
      <TaskRowContainer
        ref={ref}
        tabIndex={0}
        onBlur={handleBlur}
        onClick={handleClick}
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
            onFocus={handleTitleFocus}
            onChange={handleTitleChange}
            data-status={taskStatus(task)}
          >
            {title}
          </TaskRowTitle>
        </TaskRowHeader>
        {isOpen && (
          <TaskRowNotes
            isFocused={isNotesFocused}
            onBlur={handleNotesBlur}
            onFocus={handleNotesFocus}
            onChange={handleNotesChange}
            value={notes}
          />
        )}
        {isOpen && <TaskRowFooter task={task} />}
      </TaskRowContainer>
    );
  },
);
