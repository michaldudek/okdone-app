import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './services/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// TODO report it somewhere at some point
reportWebVitals();
