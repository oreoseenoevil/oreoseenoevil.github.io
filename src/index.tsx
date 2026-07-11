import React from 'react';
import ReactDOM from 'react-dom/client';

import 'normalize.css';
import '@fontsource/hanken-grotesk/300.css';
import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';
import '@fontsource/hanken-grotesk/700.css';
import '@fontsource/hanken-grotesk/800.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/400-italic.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/600.css';
import 'Styles/main.scss';

import { App } from 'UI/App';
import { ModeContextProvider } from 'Context/Mode';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement as Element);

root.render(
  <React.StrictMode>
    <ModeContextProvider>
      <App />
    </ModeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
