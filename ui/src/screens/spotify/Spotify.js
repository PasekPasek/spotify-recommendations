/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
    Button,
    Card, CardContent, Container, Grid, Typography,
} from '@material-ui/core';
import SpotifyIcon from '../../icons/SpotifyIcon';

export default () => {
    let windowObjectReference = null;
    const receiveMessage = (event) => {
        const { data } = event;
        console.log(data);
        // TO DO: connect with state
        window.removeEventListener('message', receiveMessage);
    };

    const channel = new BroadcastChannel('spotify-auth');
    channel.addEventListener('message', (event) => receiveMessage(event), false);

    const handleLogin = () => {
        window.removeEventListener('message', receiveMessage, false);
        const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

        // TODO: move to config
        const callbackUrl = '/spotify-auth-callback';
        const authPopupUrl = `/api/spotify/authorize?redirectUri=${encodeURI(callbackUrl)}`;

        if (windowObjectReference === null || windowObjectReference?.closed) {
            windowObjectReference = window.open(authPopupUrl, 'spotify_auth_window', strWindowFeatures);
        } else {
            windowObjectReference.focus();
        }
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography component="h1" variant="h1">
                                Spotify Analyzer
                            </Typography>
                            <Typography component="p">
                                I won't steal your data. I promise
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<SpotifyIcon />}
                                onClick={handleLogin}
                            >
                                Log in
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};
