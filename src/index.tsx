import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from 'services/reportWebVitals';
import { GlobalStyles } from 'styles/GlobalStyles';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
);

// TODO report it somewhere at some point
reportWebVitals();
