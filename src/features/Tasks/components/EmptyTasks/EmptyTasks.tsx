import styled from '@emotion/styled';
import { Button } from 'components/Button';
import { Logo } from 'components/Logo';
import { FunctionComponent } from 'react';

type Props = {
  addTask: () => void;
};

const StyledContainer = styled.div`
  margin: 15vh auto;
  text-align: center;
  color: var(--text-disabled);
`;

const StyledLogo = styled(Logo)`
  margin: var(--32px) auto;
`;

export const EmptyTasks: FunctionComponent<Props> = ({ addTask }) => {
  return (
    <StyledContainer>
      <p>What do you want to do?</p>
      <StyledLogo color="var(--text-disabled)" size={80} />
      <p>
        <Button variant="accent" onClick={() => addTask()}>
          Add new task
        </Button>
      </p>
    </StyledContainer>
  );
};
