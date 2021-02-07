/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
    Button,
    Card, CardContent, Container, Grid, Typography,
} from '@material-ui/core';
import SpotifyIcon from '../../icons/SpotifyIcon';

export default () => {
    let windowObjectReference = null;
    const target = 'spotify_auth_window';
    const receiveMessage = (event) => {
        // if (event.origin !== BASE_URL) {
        //     return;
        // }
        const { data } = event;
        // TO DO: connect with state
        console.log('🚀 ~ file: Spotify.js ~ line 17 ~ receiveMessage ~ data', data);
    };

    const handleLogin = () => {
        window.removeEventListener('message', receiveMessage);
        const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
        if (windowObjectReference === null || windowObjectReference.closed) {
            // TODO: move to config
            const callbackUrl = 'http://localhost:3000/spotify-auth-callback';
            // TODO: move to config
            windowObjectReference = window.open(`http://localhost:3000/api/spotify/authorize?redirectUri=${encodeURI(callbackUrl)}`, target, strWindowFeatures);
        } else {
            windowObjectReference.focus();
        }

        // TO DO: fix too many msgs
        window.addEventListener('message', (event) => receiveMessage(event), false);
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
