import { FunctionComponent } from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskRow } from '../../components/TaskRow';
import { useTasksList } from '../../hooks/useTasksList';

export const TaskList: FunctionComponent = () => {
  const { tasks, addTask, setTaskCompleted, updateTask, deleteTask } =
    useTasksList();

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskRow
              key={task.id}
              task={task}
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
