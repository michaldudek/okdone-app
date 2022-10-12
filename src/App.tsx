import styled from '@emotion/styled';
import { AppContainer } from 'components/AppContainer';
import { TaskList } from 'features/Tasks';

const Container = styled(AppContainer)`
  padding: var(--60px);
`;

function App() {
  return (
    <Container>
      <TaskList />
    </Container>
  );
}

export default App;
