import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "OK, Done!" app name', () => {
  render(<App />);
  const element = screen.getByText('OK, Done!');
  expect(element).toBeInTheDocument();
});
