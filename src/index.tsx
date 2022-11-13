import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { App } from 'features/App';
import { AppearanceModeProvider } from 'features/Preferences';
import { IconContext } from 'phosphor-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from 'services/reportWebVitals';
import 'styles/global.scss';
import 'the-new-css-reset/css/reset.css';

dayjs.extend(relativeTime);

const reactQueryClient = new QueryClient({
  defaultOptions: {
    // TODO how to make this work offline??
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={reactQueryClient}>
      <AppearanceModeProvider />
      <Analytics />
      <IconContext.Provider
        value={{ color: 'var(--text-tertiary)', weight: 'thin' }}
      >
        <App />
      </IconContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);

// TODO report it somewhere at some point
reportWebVitals();
