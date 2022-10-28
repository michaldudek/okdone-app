import { AppMenu } from 'features/AppMenu';
import { TaskList } from 'features/Tasks';
import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <AppMenu className={styles.menu} />
      <TaskList className={styles.taskList} />
    </div>
  );
}
