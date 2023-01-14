import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import storage from './utils/storage.js';
import { setAuthorizationHeader } from './api/client.js';
import { AuthContextProvider } from './components/auth/Context.js';
import Root from './Root';

import configureStore from './store';

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);

const store = configureStore({auth: !!accessToken});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root store={store}>
      <AuthContextProvider haveToken={!!accessToken}>
        <App />
      </AuthContextProvider>
    </Root>
  </React.StrictMode>
);
