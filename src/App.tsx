import { AppContainer } from 'components/AppContainer';
import { TasksView } from 'features/Tasks';

function App() {
  return (
    <AppContainer>
      <h1>OK, Done!</h1>
      <TasksView />
    </AppContainer>
  );
}

export default App;
