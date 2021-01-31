import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/ProfileInfo';

const authDomain = process.env.AUTH_DOMAIN;
const authClientId = process.env.AUTH_CLIENT_ID;

const App = () => (
    <div>
        <h1>Home</h1>
        <LoginButton />
        <LogoutButton />
        <Profile />
    </div>
);

const AuthWrapper = () => (
    <Auth0Provider
        domain={authDomain}
        clientId={authClientId}
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>
);

export default hot(AuthWrapper);
