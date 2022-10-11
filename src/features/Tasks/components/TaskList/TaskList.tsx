import { FunctionComponent } from 'react';
import {
  DeleteTaskFn,
  SetTaskCompletedFn,
  UpdateTaskFn,
} from '../../hooks/useTasksList';
import { Task } from '../../types';
import { TaskRow } from '../TaskRow';

type Props = {
  tasks: Task[];
  setTaskCompleted: SetTaskCompletedFn;
  updateTask: UpdateTaskFn;
  deleteTask: DeleteTaskFn;
};

export const TaskList: FunctionComponent<Props> = ({
  tasks,
  setTaskCompleted,
  updateTask,
  deleteTask,
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
            deleteTask={deleteTask}
          />
        </li>
      ))}
    </ul>
  );
};
