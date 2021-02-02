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
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/ProfileInfo';

const authDomain = process.env.AUTH_DOMAIN;
const authClientId = process.env.AUTH_CLIENT_ID;

const App = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (bool = true) => () => {
        setOpen(bool);
    };

    return (
        <>
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

                <Container maxWidth="xl">
                    <Switch>
                        <Route exact path="/spotify">
                            <>
                                <h1>Spotify Analyzer</h1>
                            </>
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
                </Container>
            </Router>
        </>
    );
};

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
