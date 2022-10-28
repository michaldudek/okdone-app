import { Button } from 'components/Button';
import { Logo } from 'components/Logo';
import { FunctionComponent } from 'react';
import styles from './EmptyTasks.module.scss';

type Props = {
  addTask: () => void;
};

export const EmptyTasks: FunctionComponent<Props> = ({ addTask }) => {
  return (
    <div className={styles.emptyTasks}>
      <p>What do you want to do?</p>
      <Logo color="var(--text-disabled)" size={80} className={styles.logo} />
      <p>
        <Button variant="accent" onClick={() => addTask()}>
          Add new task
        </Button>
      </p>
    </div>
  );
};
