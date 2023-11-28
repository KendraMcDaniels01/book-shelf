import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-c1mnrkw8ei67bomd.us.auth0.com"
      clientID="3ueeeOf5hVF0YHyHxC1tEwqf7YdYsJSi"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
