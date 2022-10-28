import { TimeRelative } from 'components/TimeRelative';
import { FunctionComponent } from 'react';
import { Task } from '../../types';
import styles from './TaskRow.module.scss';

type Props = {
  task: Task;
};

export const TaskRowFooter: FunctionComponent<Props> = ({ task }) => {
  const { completedAt, createdAt } = task;

  return (
    <div className={styles.footer}>
      {completedAt && (
        <span>
          Completed <TimeRelative date={completedAt} />
        </span>
      )}
      {createdAt && (
        <span>
          Created <TimeRelative date={createdAt} />
        </span>
      )}
    </div>
  );
};
