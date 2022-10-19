import { Task } from 'features/Tasks/types';
import { findTaskAfter, findTaskBefore } from 'features/Tasks/utils/find';
import {
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useRef,
} from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskRow } from '../../components/TaskRow';
import { useTasks } from '../../hooks/useTasks';
import { useFocusedTaskTracker } from './useFocusedTaskTracker';
import { useOpenTaskTracker } from './useOpenTaskTracker';

export const TaskList: FunctionComponent = () => {
  const listRef = useRef<HTMLUListElement>(null);

  const { tasks, addTask, setTaskCompleted, updateTask, deleteTask } =
    useTasks();

  const [openTaskId, toggleOpenTask] = useOpenTaskTracker(listRef);
  const { focusedTaskId, setFocus, onBlurTask, onFocusTask } =
    useFocusedTaskTracker();

  const handleKeyDown = useCallback(
    (task: Task, event: KeyboardEvent) => {
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
          setFocus(newTask.id);
        },
        Escape: () => toggleOpenTask(task, false),
        Backspace: async () => {
          const nextFocusTask =
            findTaskBefore(tasks, task) || findTaskAfter(tasks, task);
          if (nextFocusTask) {
            setFocus(nextFocusTask.id);
          }
          deleteTask(task.id);
        },
        ArrowUp: () => {
          const prevTask = findTaskBefore(tasks, task);
          if (prevTask) {
            setFocus(prevTask.id);
          }
        },
        ArrowDown: () => {
          const nextTask = findTaskAfter(tasks, task);
          if (nextTask) {
            setFocus(nextTask.id);
          }
        },
      };

      actions[event.key]?.();
    },
    [addTask, deleteTask, setFocus, setTaskCompleted, tasks, toggleOpenTask],
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
              onFocus={onFocusTask}
              onChange={handleChange}
              onCompleted={setTaskCompleted}
              onDoubleClick={handleDoubleClick}
              onKeyDown={handleKeyDown}
            />
          </li>
        ))}
      </ul>
      <TaskInput onAdd={addTask} />
    </>
  );
};
