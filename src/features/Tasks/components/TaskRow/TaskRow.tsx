import styled from '@emotion/styled';
import { Checkbox } from 'components/Checkbox';
import { FunctionComponent } from 'react';
import { Task } from '../../types';

type Props = {
  task: Task;
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

export const TaskRow: FunctionComponent<Props> = ({ task }) => {
  return (
    <Container>
      <CheckboxWrap>
        <Checkbox />
      </CheckboxWrap>
      <span>{task.name}</span>
    </Container>
  );
};
