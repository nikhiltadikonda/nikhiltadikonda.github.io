import React from 'react';
import { createRoot } from 'react-dom/client';
import ThemeContextProvider from './context/ThemeContext';
import './styles/index.css';
import './styles/styles.css';
import App from './App';
import reportWebVitals from './vitals/reportWebVitals';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </React.StrictMode>
  );
}

reportWebVitals();
