import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import 'Styles/main.scss';

import { App } from 'UI/App';
import { ModeContextProvider } from 'Context/Mode';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ModeContextProvider>
      <App />
    </ModeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();