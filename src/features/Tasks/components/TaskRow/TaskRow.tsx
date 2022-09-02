import { FunctionComponent } from 'react';
import { Task } from '../../types';

type Props = {
  task: Task;
};

export const TaskRow: FunctionComponent<Props> = ({ task }) => {
  return <div>{task.name}</div>;
};
