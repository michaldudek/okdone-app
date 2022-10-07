import { FunctionComponent } from 'react';
import { SetTaskCompletedFn } from '../../hooks/useTasksList';
import { Task } from '../../types';
import { TaskRow } from '../TaskRow';

type Props = {
  tasks: Task[];
  setTaskCompleted: SetTaskCompletedFn;
};

export const TaskList: FunctionComponent<Props> = ({
  tasks,
  setTaskCompleted,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskRow
            key={task.id}
            task={task}
            setTaskCompleted={setTaskCompleted}
          />
        </li>
      ))}
    </ul>
  );
};
