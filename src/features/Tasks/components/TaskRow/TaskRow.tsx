import styled from '@emotion/styled';
import { Checkbox } from 'components/Checkbox';
import { FunctionComponent, memo } from 'react';
import { SetTaskCompletedFn } from '../../hooks/useTasksList';
import { Task } from '../../types';

type Props = {
  task: Task;
  setTaskCompleted: SetTaskCompletedFn;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: var(--6px);
`;

const CheckboxWrap = styled.div`
  margin-right: var(--6px);
`;

export const TaskRow: FunctionComponent<Props> = memo(
  ({ setTaskCompleted, task }) => {
    const { name, completedDate } = task;

    console.log('TaskRow', name);

    return (
      <Container>
        <CheckboxWrap>
          <Checkbox
            checked={!!completedDate}
            onCheckedChange={(checked) =>
              setTaskCompleted(task, Boolean(checked))
            }
          />
        </CheckboxWrap>
        <span>{name}</span>
      </Container>
    );
  },
);
