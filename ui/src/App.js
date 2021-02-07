import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from 'react-hot-loader/root';
import { Auth0Provider } from '@auth0/auth0-react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/ProfileInfo';
import Spotify from './screens/spotify/Spotify';
import SpotifyCallback from './screens/spotify/SpotifyCallback';

const authDomain = process.env.AUTH_DOMAIN;
const authClientId = process.env.AUTH_CLIENT_ID;
// const defaultTheme = createMuiTheme();
const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const App = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (bool = true) => () => {
        setOpen(bool);
    };

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Router>

                    <ClickAwayListener onClickAway={toggleDrawer(false)}>
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer(true)}
                                edge="start"
                                style={{ position: 'absolute', top: 10, right: 10 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="right"
                                open={open}
                                onClose={toggleDrawer(false)}
                            >
                                <List>
                                    <ListItem button onClick={toggleDrawer(false)}>
                                        <ListItemText primary="Close" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
                                        <ListItemText primary="Home" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/spotify" onClick={toggleDrawer(false)}>
                                        <ListItemText primary="Spotify" />
                                    </ListItem>
                                </List>
                            </Drawer>
                        </>
                    </ClickAwayListener>

                    <Switch>
                        <Route exact path="/spotify">
                            <Spotify />
                        </Route>
                        <Route exact path="/">
                            <>
                                <h1>Home</h1>
                                <LoginButton />
                                <LogoutButton />
                                <Profile />
                            </>
                        </Route>
                        <Route>
                            <>
                                <h1>404 - NOT FOUND</h1>
                            </>
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </>
    );
};

const AuthWrapper = () => (
    <Auth0Provider
        domain={authDomain}
        clientId={authClientId}
        redirectUri={window.location.origin}
    >
        <Router>
            <Switch>
                <Route exact path="/spotify-auth-callback">
                    <SpotifyCallback />
                </Route>

                <Route>
                    <App />
                </Route>
            </Switch>
        </Router>
    </Auth0Provider>
);

export default hot(AuthWrapper);
