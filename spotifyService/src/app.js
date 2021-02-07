const express = require('express');
const config = require('config');
const URI = require('urijs');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const generateState = require('./utils/generateState');

const app = express();
const {
    clientId, clientSecret, authURL, tokenURL, userURL,
} = config.get('SpotifyConfig');
const baseURL = config.get('Application.baseURL');
const stateCookieKey = 'spotify_auth_state';
const redirectURICookieKey = 'spotify_auth_redirect_uri';
const accessTokenCookieKey = 'spotify_access_token';
const refreshTokenCookieKey = 'spotify_refresh_token';
const spotifyAuthRedirectURI = new URI(baseURL).segment('auth-callback');

app.use(cookieParser());

app.get('/user', async (req, res) => {
    const accessToken = req.cookies[accessTokenCookieKey];
    if (!accessToken) {
        return res.status(400).json({ message: 'Wrong request' });
    }

    const spotifyRequestHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
    };

    try {
        const userDataResponse = await fetch(userURL, { headers: spotifyRequestHeaders });

        if (!userDataResponse.ok) {
            return res.status(userDataResponse.status).json({ message: `Spotify API responded with ${userDataResponse.status}` });
        }

        const data = await userDataResponse.json();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/authorize', (req, res) => {
    const { redirectUri } = req.query;

    if (!redirectUri) {
        return res.status(400).json({ message: 'Wrong request' });
    }
    const state = generateState(40);
    res.cookie(stateCookieKey, state, { httpOnly: true });
    res.cookie(redirectURICookieKey, redirectUri, { httpOnly: true });

    const scopes = 'user-read-recently-played user-top-read user-read-email user-read-private';
    const spotifyAuthURL = new URI(authURL);
    spotifyAuthURL.setQuery({
        response_type: 'code',
        client_id: clientId,
        scope: encodeURIComponent(scopes),
        redirect_uri: spotifyAuthRedirectURI.toString(),
        state,
    });
    return res.redirect(spotifyAuthURL);
});

app.get('/auth-callback', async (req, res) => {
    const cookieState = req.cookies[stateCookieKey];
    const redirectURI = req.cookies[redirectURICookieKey];
    const { code, state, error } = req.query;

    if (cookieState !== state || !redirectURI) {
        return res.status(400).json({ message: 'Wrong request' });
    }

    if (error) {
        const redirectWithErrorUri = new URI(redirectURI).setQuery({ error });
        return res.redirect(redirectWithErrorUri);
    }

    if (!code) {
        const redirectWithErrorUri = new URI(redirectURI).setQuery({ error: 'no_code' });
        return res.redirect(redirectWithErrorUri);
    }

    const tokenRequestBody = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: spotifyAuthRedirectURI.toString(),
    };

    const base64EncodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenRequestHeaders = {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: `Basic ${base64EncodedCredentials}`,
    };

    try {
        const tokenResponse = await fetch(tokenURL, { method: 'POST', body: new URLSearchParams(tokenRequestBody), headers: tokenRequestHeaders });
        if (!tokenResponse.ok) {
            const redirectWithErrorUri = new URI(redirectURI)
                .setQuery({ error: `status-${tokenResponse.status}` });
            return res.redirect(redirectWithErrorUri);
        }
        const data = await tokenResponse.json();
        res.cookie(accessTokenCookieKey, data.access_token, { httpOnly: true });
        res.cookie(refreshTokenCookieKey, data.refresh_token, { httpOnly: true });
    } catch (err) {
        const redirectWithErrorUri = new URI(redirectURI).setQuery({ error: 'fetch_token' });
        return res.redirect(redirectWithErrorUri);
    }

    const redirectWithSuccess = new URI(redirectURI).setQuery({ success: 'true' });
    return res.redirect(redirectWithSuccess);
});

module.exports = app;
