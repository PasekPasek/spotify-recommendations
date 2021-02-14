import React from 'react';
import { SpotifyAuthProvider } from './contexts/auth';
import Spotify from './Spotify';

export default () => (
    <SpotifyAuthProvider>
        <Spotify />
    </SpotifyAuthProvider>
);
