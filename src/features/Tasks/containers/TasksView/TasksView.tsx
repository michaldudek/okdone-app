import { FunctionComponent } from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskList } from '../../components/TaskList';
import { useTasksList } from '../../hooks/useTasksList';

export const TasksView: FunctionComponent = () => {
  const { tasks, addTask, setTaskCompleted } = useTasksList();

  return (
    <div>
      <TaskList tasks={tasks || []} setTaskCompleted={setTaskCompleted} />
      <TaskInput onAdd={addTask} />
    </div>
  );
};
