import { FunctionComponent } from 'react';
import { TaskInput } from '../../components/TaskInput';
import { TaskList } from '../../components/TaskList';
import { useAddTask } from '../../hooks/useAddTask';
import { useTasksList } from '../../hooks/useTasksList';

export const TasksView: FunctionComponent = () => {
  const { tasks } = useTasksList();
  const addTask = useAddTask();

  return (
    <div>
      <TaskList tasks={tasks} />
      <TaskInput onAdd={addTask} />
    </div>
  );
};
