import { FunctionComponent } from 'react';
import { SetTaskCompletedFn, UpdateTaskFn } from '../../hooks/useTasksList';
import { Task } from '../../types';
import { TaskRow } from '../TaskRow';

type Props = {
  tasks: Task[];
  setTaskCompleted: SetTaskCompletedFn;
  updateTask: UpdateTaskFn;
};

export const TaskList: FunctionComponent<Props> = ({
  tasks,
  setTaskCompleted,
  updateTask,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskRow
            key={task.id}
            task={task}
            setTaskCompleted={setTaskCompleted}
            updateTask={updateTask}
          />
        </li>
      ))}
    </ul>
  );
};
