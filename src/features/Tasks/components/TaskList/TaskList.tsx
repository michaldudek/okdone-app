import { FunctionComponent } from 'react';
import { Task } from '../../types';
import { TaskRow } from '../TaskRow';

type Props = {
  tasks: Task[];
};

export const TaskList: FunctionComponent<Props> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskRow key={task.id} task={task} />
        </li>
      ))}
    </ul>
  );
};
