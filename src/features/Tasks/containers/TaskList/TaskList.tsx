import {
  FunctionComponent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { TaskRow } from '../../components/TaskRow';
import { useTasks } from '../../hooks/useTasks';
import { Task } from '../../types';
import {
  findFirstTask,
  findLastTask,
  findTaskAfter,
  findTaskBefore,
} from '../../utils/find';
import { useFocusedTaskTracker } from './useFocusedTaskTracker';
import { useOpenTaskTracker } from './useOpenTaskTracker';

export const TaskList: FunctionComponent = () => {
  const listRef = useRef<HTMLUListElement>(null);

  const { tasks, addTask, setTaskCompleted, updateTask, deleteTask } =
    useTasks();

  const [openTaskId, toggleOpenTask] = useOpenTaskTracker(listRef);
  const {
    focusedTaskId,
    setFocusedTask,
    clearFocusedTask,
    onBlurTask,
    onFocusTask,
  } = useFocusedTaskTracker();

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      // CTRL+N creates a new task at the end of the list
      if (event.key.toLowerCase() === 'n' && event.ctrlKey) {
        event.preventDefault();
        const newTask = await addTask({
          title: '',
          taskBefore: findLastTask(tasks),
        });
        setFocusedTask(newTask.id);
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
  }, [addTask, focusedTaskId, setFocusedTask, tasks]);

  const handleKeyDown = useCallback(
    (task: Task, { key, shiftKey }: ReactKeyboardEvent) => {
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
        Backspace: async () => {
          if (shiftKey && openTaskId !== task.id) {
            const nextFocusTask =
              findTaskBefore(tasks, task) || findTaskAfter(tasks, task);
            if (nextFocusTask) {
              setFocusedTask(nextFocusTask.id);
            }
            deleteTask(task.id);
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
      // TODO debounce this call
      updateTask({
        id: task.id,
        ...change,
      });
    },
    [updateTask],
  );

  return (
    <>
      <ul ref={listRef}>
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
      </ul>
    </>
  );
};
