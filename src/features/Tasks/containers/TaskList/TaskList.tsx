import { FunctionComponent, useRef } from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskRow } from '../../components/TaskRow';
import { useTasksList } from '../../hooks/useTasksList';
import { useOpenTaskTracker } from './useOpenTaskTracker';

export const TaskList: FunctionComponent = () => {
  const listRef = useRef<HTMLUListElement>(null);

  const { tasks, addTask, setTaskCompleted, updateTask, deleteTask } =
    useTasksList();

  const [openTaskId, toggleOpenTask] = useOpenTaskTracker(listRef);

  return (
    <>
      <ul ref={listRef}>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskRow
              key={task.id}
              task={task}
              isOpen={openTaskId === task.id}
              onToggleOpen={toggleOpenTask}
              setTaskCompleted={setTaskCompleted}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </li>
        ))}
      </ul>
      <TaskInput onAdd={addTask} />
    </>
  );
};
