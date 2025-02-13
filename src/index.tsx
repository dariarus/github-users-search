import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import 'normalize.css';
import './index.css';
import './fonts/fonts.css';

import {store} from "./services/store";

import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
