import styled from '@emotion/styled';
import { AppMenu } from 'features/AppMenu';
import { TaskList } from 'features/Tasks';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  background-color: var(--background-app);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const StyledAppMenu = styled(AppMenu)`
  order: 1;
  flex-shrink: 0;
`;

const StyledTaskList = styled(TaskList)`
  flex: 1;
  order: 0;
  overflow-y: auto;
`;

function App() {
  return (
    <AppContainer>
      <StyledAppMenu />
      <StyledTaskList />
    </AppContainer>
  );
}

export default App;
