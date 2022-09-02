import styled from '@emotion/styled';
import { AppContainer } from 'components/AppContainer';
import { TasksView } from 'features/Tasks';

const Container = styled(AppContainer)`
  padding: var(--60px);
`;

function App() {
  return (
    <Container>
      <TasksView />
    </Container>
  );
}

export default App;
