import styled from '@emotion/styled';
import { TimeRelative } from 'components/TimeRelative';
import { Task } from 'features/Tasks/types';
import { FunctionComponent } from 'react';

type Props = {
  task: Task;
};

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--24px);
  margin-top: var(--16px);
  color: var(--text-tertiary);
  font-size: var(--12px);
`;

export const TaskRowFooter: FunctionComponent<Props> = ({ task }) => {
  const { completedAt, createdAt } = task;

  return (
    <Footer>
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
    </Footer>
  );
};
