/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react';
import {
    Button,
    Card, CardContent, Container, Grid, Typography,
} from '@material-ui/core';
import { SpotifyAuthContext } from './contexts/auth';
import SpotifyIcon from '../../icons/SpotifyIcon';
import Recommendations from './components/Recommendations';

export default () => {
    const { handleLogin, isLoggedIn, userData } = useContext(SpotifyAuthContext);

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
                            {!isLoggedIn ? (
                                <Button
                                    variant="outlined"
                                    startIcon={<SpotifyIcon />}
                                    onClick={() => handleLogin()}
                                >
                                    Log in
                                </Button>
                            ) : (
                                <Typography component="p">
                                    {`Hello, ${userData.display_name}`}
                                </Typography>
                            )}
                            <Recommendations />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};
