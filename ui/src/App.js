import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Auth0Provider } from '@auth0/auth0-react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/ProfileInfo';

const authDomain = process.env.AUTH_DOMAIN;
const authClientId = process.env.AUTH_CLIENT_ID;

const App = () => (
    <>
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/spotify">Spotify analyzer</Link>
                    </li>
                </ul>
            </div>
            <Switch>
                <Route path="/spotify">
                    <>
                        <h1>Spotify Analyzer</h1>
                    </>
                </Route>
                <Route path="/">
                    <>
                        <h1>Home</h1>
                        <LoginButton />
                        <LogoutButton />
                        <Profile />
                    </>
                </Route>
                <Route path="*">
                    <>
                        <h1>404 - NOT FOUND</h1>
                    </>
                </Route>
            </Switch>
        </Router>
    </>
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
