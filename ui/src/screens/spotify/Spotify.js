/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
    Button,
    Card, CardContent, Container, Grid, Typography,
} from '@material-ui/core';
import SpotifyIcon from '../../icons/SpotifyIcon';

const handleLogin = () => {
    console.log('Handle login!');
};

export default () => (
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
