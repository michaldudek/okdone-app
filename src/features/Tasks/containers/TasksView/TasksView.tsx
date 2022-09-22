import { FunctionComponent } from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskList } from '../../components/TaskList';
import { useTasksList } from '../../hooks/useTasksList';

export const TasksView: FunctionComponent = () => {
  const { tasks, addTask } = useTasksList();

  return (
    <div>
      <TaskList tasks={tasks || []} />
      <TaskInput onAdd={addTask} />
    </div>
  );
};
