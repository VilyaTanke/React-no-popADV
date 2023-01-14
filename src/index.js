import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import storage from './utils/storage.js';
import { setAuthorizationHeader } from './api/client.js';
import configureStore from './store';
import Root from './Root';

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);

const store = configureStore({ auth: !!accessToken });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root store={store}>
      <App />
    </Root>
  </React.StrictMode>
);

