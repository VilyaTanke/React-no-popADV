import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import storage from './utils/storage.js';
import { setAuthorizationHeader } from './api/client.js';
import { AuthContextProvider } from './components/auth/Context.js';

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider haveToken={!!accessToken}>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
