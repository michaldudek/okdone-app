import styled from '@emotion/styled';
import { TimeRelative } from 'components/TimeRelative';
import { FunctionComponent } from 'react';
import { Task } from '../../types';

type Props = {
  task: Task;
};

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--24px);
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
