import { Note } from 'phosphor-react';
import {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
  KeyboardEvent,
  KeyboardEventHandler,
  memo,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Task } from '../../types';
import { taskStatus } from '../../utils/taskStatus';
import { TaskRowCheckbox } from './TaskRowCheckbox';
import { TaskRowContainer } from './TaskRowContainer';
import { TaskRowFooter } from './TaskRowFooter';
import { TaskRowHeader } from './TaskRowHeader';
import { TaskRowNotes } from './TaskRowNotes';
import { TaskRowTitle } from './TaskRowTitle';

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
    const { title, notes, completedDate } = task;
    const isCompleted = !!completedDate;

    const ref = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const notesRef = useRef<HTMLTextAreaElement>(null);

    /**
     * Check if the document focus is somewhere within the TaskRow
     */
    const hasFocus = (): boolean =>
      ref.current?.contains(document.activeElement) ?? false;

    /* Manage focused state */
    useEffect(() => {
      if (isFocused && !hasFocus()) {
        titleRef.current?.focus();
        return;
      }

      if (isFocused && document.activeElement === ref.current) {
        titleRef.current?.focus();
      }
    }, [isFocused]);

    useEffect(() => {
      if (!isOpen && isFocused && !hasFocus()) {
        titleRef.current?.focus();
      }

      if (!isOpen && !isFocused) {
        ref.current?.blur();
        titleRef.current?.blur();
      }
    }, [isFocused, isOpen]);

    const handleFocus = useCallback<FocusEventHandler>(
      () => onFocus?.(task),
      [onFocus, task],
    );
    const handleClick = useCallback<MouseEventHandler>(
      () => onFocus?.(task),
      [onFocus, task],
    );
    const handleBlur = useCallback<FocusEventHandler>(
      () => onBlur?.(task),
      [onBlur, task],
    );

    /* Manage open state and default focus */
    const handleDoubleClick = useCallback<MouseEventHandler>(
      (event) => {
        if (!isOpen) {
          titleRef.current?.focus();
        }
        onDoubleClick?.(task, event);
      },
      [isOpen, onDoubleClick, task],
    );

    /* Manage key shortcuts */
    const handleKeyDown = useCallback<KeyboardEventHandler>(
      (event) => onKeyDown?.(task, event),
      [onKeyDown, task],
    );

    const handleTitleKeyDown = useCallback<KeyboardEventHandler>(
      (event) => {
        // ENTER when task is open switches focus to Notes
        if (isOpen && event.key === 'Enter' && !event.shiftKey) {
          event.stopPropagation();
          event.preventDefault();
          notesRef.current?.focus();
          return;
        }
      },
      [isOpen],
    );

    /* Manage content changes */
    const handleTitleChange = useCallback<
      ChangeEventHandler<HTMLTextAreaElement>
    >(
      (event) => onChange?.(task, { title: event.currentTarget.value }),
      [onChange, task],
    );

    const handleNotesChange = useCallback<
      ChangeEventHandler<HTMLTextAreaElement>
    >(
      (event) => onChange?.(task, { notes: event.currentTarget.value }),
      [onChange, task],
    );

    return (
      <TaskRowContainer
        // TODO needs some aria role
        ref={ref}
        tabIndex={0}
        onFocus={handleFocus}
        onClick={handleClick}
        onBlur={handleBlur}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        data-focused={isFocused}
        data-status={taskStatus(task)}
      >
        <TaskRowHeader>
          <TaskRowCheckbox
            tabIndex={-1}
            checked={isCompleted}
            onCheckedChange={(checked) => onCompleted?.(task, Boolean(checked))}
          />
          <TaskRowTitle
            ref={titleRef}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            data-status={taskStatus(task)}
            value={title}
          />
          {!isOpen && task.notes?.length ? <Note size={16} /> : null}
        </TaskRowHeader>
        {isOpen && (
          <TaskRowNotes
            ref={notesRef}
            onChange={handleNotesChange}
            value={notes}
          />
        )}
        {isOpen && <TaskRowFooter task={task} />}
      </TaskRowContainer>
    );
  },
);
