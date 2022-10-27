import styled from '@emotion/styled';
import {
  ComponentProps,
  FunctionComponent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { MediaQuery } from 'styles';
import { useDebounce } from 'utils/useDebounce';
import { EmptyTasks } from '../../components/EmptyTasks';
import { TaskRow } from '../../components/TaskRow';
import { useTasksList } from '../../hooks/useTasksList';
import { useTasksManager } from '../../hooks/useTasksManager';
import { Task } from '../../types';
import {
  findFirstTask,
  findLastTask,
  findTaskAfter,
  findTaskBefore,
} from '../../utils/find';
import { useFocusedTaskTracker } from './useFocusedTaskTracker';
import { useOpenTaskTracker } from './useOpenTaskTracker';

const StyledList = styled.ul`
  padding: var(--24px) var(--16px);
  font-size: var(--20px);

  ${MediaQuery.Tablet} {
    margin: 0 auto;
    width: var(--768px);
    padding: var(--60px);
    font-size: var(--16px);
  }
`;

export const TaskList: FunctionComponent<ComponentProps<'div'>> = ({
  ...props
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  const { tasks, isLoading } = useTasksList();
  const { addTask, setTaskCompleted, updateTask, deleteTask } =
    useTasksManager();
  const updateTaskDebounce = useDebounce(updateTask, 500);

  const [openTaskId, toggleOpenTask] = useOpenTaskTracker(listRef);
  const {
    focusedTaskId,
    setFocusedTask,
    clearFocusedTask,
    onBlurTask,
    onFocusTask,
  } = useFocusedTaskTracker();

  const addNewTask = useCallback(
    async (title?: string) => {
      const newTask = await addTask({
        title: title ?? '',
        taskBefore: findLastTask(tasks),
      });
      setFocusedTask(newTask.id);
    },
    [addTask, setFocusedTask, tasks],
  );

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      // CTRL+N creates a new task at the end of the list
      if (event.key.toLowerCase() === 'n' && event.ctrlKey) {
        event.preventDefault();
        await addNewTask();
        return;
      }

      // ARROW UP and DOWN start navigating the list if no task is focused
      if (!focusedTaskId) {
        if (event.key === 'ArrowUp') {
          const lastTask = findLastTask(tasks);
          if (lastTask) {
            setFocusedTask(lastTask.id);
          }
          return;
        }

        if (event.key === 'ArrowDown') {
          const firstTask = findFirstTask(tasks);
          if (firstTask) {
            setFocusedTask(firstTask.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [addNewTask, addTask, focusedTaskId, setFocusedTask, tasks]);

  const handleKeyDown = useCallback(
    (task: Task, event: ReactKeyboardEvent) => {
      const { key, shiftKey } = event;
      const actions: Record<string, () => void> = {
        // SPACE toggles the task complete
        ' ': () => setTaskCompleted(task, !task.completedAt),
        Space: () => setTaskCompleted(task, !task.completedAt),
        // SHIFT+ENTER toggles the open state
        // ENTER adds a new task after the focused task
        Enter: async () => {
          if (shiftKey) {
            toggleOpenTask(task);
            return;
          }

          const taskAfter = findTaskAfter(tasks, task);
          const newTask = await addTask({
            title: '',
            taskBefore: task,
            taskAfter: taskAfter,
          });
          setFocusedTask(newTask.id);
        },
        // ESCAPE closes the task and sets focus on it
        // ESCAPE clears focus if no task is open
        Escape: () => {
          if (openTaskId) {
            toggleOpenTask(task, false);
            setFocusedTask(openTaskId);
            return;
          }

          clearFocusedTask();
        },
        // SHIFT+BACKSPACE deletes the task only if it isn't open
        // BACKSPACE deletes the task if it isn't open and is empty
        Backspace: async () => {
          if (openTaskId !== task.id) {
            if (shiftKey || (!task.title && !task.notes)) {
              event.preventDefault();
              const nextFocusTask =
                findTaskBefore(tasks, task) || findTaskAfter(tasks, task);
              if (nextFocusTask) {
                setFocusedTask(nextFocusTask.id);
              }
              deleteTask(task.id);
              return;
            }

            // when trying to delete from empty title, but there are some notes
            // open the task to show this to the user
            if (!shiftKey && !task.title && task.notes) {
              toggleOpenTask(task, true);
            }
          }
        },
        // ARROW UP navigates the list up
        ArrowUp: () => {
          const prevTask = findTaskBefore(tasks, task);
          if (prevTask) {
            setFocusedTask(prevTask.id);
          }
        },
        // ARROW DOWN navigates the list down
        ArrowDown: () => {
          const nextTask = findTaskAfter(tasks, task);
          if (nextTask) {
            setFocusedTask(nextTask.id);
          }
        },
      };

      actions[key]?.();
    },
    [
      addTask,
      clearFocusedTask,
      deleteTask,
      openTaskId,
      setFocusedTask,
      setTaskCompleted,
      tasks,
      toggleOpenTask,
    ],
  );

  const handleFocus = useCallback(
    (task: Task) => {
      onFocusTask(task);
      // close any other task
      if (openTaskId !== task.id) {
        toggleOpenTask(task, false);
      }
    },
    [onFocusTask, openTaskId, toggleOpenTask],
  );

  const handleDoubleClick = useCallback(
    (task: Task, event: MouseEvent) => {
      toggleOpenTask(task, true);
    },
    [toggleOpenTask],
  );

  const handleChange = useCallback(
    (task: Task, change: Partial<Task>) => {
      // if content was emptied or was empty before then update immediatelly
      const isCleared = Object.keys(change).some((key) => {
        const theKey = key as keyof Task; // keep TS happy
        return !change[theKey] || !task[theKey];
      });
      const updateFn = isCleared ? updateTask : updateTaskDebounce;
      updateFn({
        id: task.id,
        ...change,
      });
    },
    [updateTask, updateTaskDebounce],
  );

  return (
    <div {...props}>
      <StyledList ref={listRef}>
        {tasks.length === 0 && !isLoading && (
          <li>
            <EmptyTasks addTask={addNewTask} />
          </li>
        )}
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskRow
              key={task.id}
              task={task}
              isOpen={openTaskId === task.id}
              isFocused={focusedTaskId === task.id}
              onBlur={onBlurTask}
              onFocus={handleFocus}
              onChange={handleChange}
              onCompleted={setTaskCompleted}
              onDoubleClick={handleDoubleClick}
              onKeyDown={handleKeyDown}
            />
          </li>
        ))}
      </StyledList>
    </div>
  );
};
