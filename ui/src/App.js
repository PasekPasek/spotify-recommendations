import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from 'react-hot-loader/root';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Spotify from './screens/spotify';
import SpotifyCallback from './screens/spotify/components/SpotifyCallback';

// const defaultTheme = createMuiTheme();
const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const App = () => (
    <>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route exact path="/spotify-auth-callback">
                        <SpotifyCallback />
                    </Route>
                    <Route exact path="/">
                        <Spotify />
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

export default hot(App);
