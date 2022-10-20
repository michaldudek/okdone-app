import { Task } from 'features/Tasks/types';
import {
  findLastTask,
  findTaskAfter,
  findTaskBefore,
} from 'features/Tasks/utils/find';
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
import { useFocusedTaskTracker } from './useFocusedTaskTracker';
import { useOpenTaskTracker } from './useOpenTaskTracker';

export const TaskList: FunctionComponent = () => {
  const listRef = useRef<HTMLUListElement>(null);

  const { tasks, addTask, setTaskCompleted, updateTask, deleteTask } =
    useTasks();

  const [openTaskId, toggleOpenTask] = useOpenTaskTracker(listRef);
  const { focusedTaskId, setFocusedTask, onBlurTask, onFocusTask } =
    useFocusedTaskTracker();

  useEffect(() => {
    const handleAddNewTask = async (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'n' && event.ctrlKey) {
        event.preventDefault();
        const newTask = await addTask({
          title: '',
          taskBefore: findLastTask(tasks),
        });
        setFocusedTask(newTask.id);
      }
    };

    window.addEventListener('keydown', handleAddNewTask);
    return () => {
      window.removeEventListener('keydown', handleAddNewTask);
    };
  }, [addTask, setFocusedTask, tasks]);

  const handleKeyDown = useCallback(
    (task: Task, event: ReactKeyboardEvent) => {
      const actions: Record<string, () => void> = {
        ' ': () => setTaskCompleted(task, !task.completedAt),
        Space: () => setTaskCompleted(task, !task.completedAt),
        Enter: async () => {
          if (event.shiftKey) {
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
        Escape: () => toggleOpenTask(task, false),
        Backspace: async () => {
          if (event.metaKey || event.ctrlKey) {
            const nextFocusTask =
              findTaskBefore(tasks, task) || findTaskAfter(tasks, task);
            if (nextFocusTask) {
              setFocusedTask(nextFocusTask.id);
            }
            deleteTask(task.id);
          }
        },
        ArrowUp: () => {
          const prevTask = findTaskBefore(tasks, task);
          if (prevTask) {
            setFocusedTask(prevTask.id);
          }
        },
        ArrowDown: () => {
          const nextTask = findTaskAfter(tasks, task);
          if (nextTask) {
            setFocusedTask(nextTask.id);
          }
        },
      };

      actions[event.key]?.();
    },
    [
      addTask,
      deleteTask,
      setFocusedTask,
      setTaskCompleted,
      tasks,
      toggleOpenTask,
    ],
  );

  const handleFocus = useCallback(
    (task: Task) => {
      onFocusTask(task);
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
