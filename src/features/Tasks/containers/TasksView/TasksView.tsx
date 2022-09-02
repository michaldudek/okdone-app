import { FunctionComponent } from 'react';
import { TaskList } from '../../components/TaskList';
import { useTasksList } from '../../hooks/useTasksList';

export const TasksView: FunctionComponent = () => {
  const { tasks } = useTasksList();
  return (
    <div>
      <TaskList tasks={tasks} />
    </div>
  );
};
