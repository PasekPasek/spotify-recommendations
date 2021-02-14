const express = require('express');
const config = require('config');
const URI = require('urijs');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const generateState = require('./utils/generateState');
const getBasicAuthHeaders = require('./utils/getBasicAuthHeaders');
const getAccessTokenHeaders = require('./utils/getAccessTokenHeaders');

const app = express();
const {
    clientId, authURL, tokenURL, userURL,
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

    try {
        const userDataResponse = await fetch(
            userURL,
            { headers: getAccessTokenHeaders(accessToken) },
        );

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

    const scopes = 'user-read-recently-played user-top-read';
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

    try {
        const tokenResponse = await fetch(tokenURL, { method: 'POST', body: new URLSearchParams(tokenRequestBody), headers: getBasicAuthHeaders() });
        if (!tokenResponse.ok) {
            const redirectWithErrorUri = new URI(redirectURI)
                .setQuery({ error: `status-${tokenResponse.status}` });
            return res.redirect(redirectWithErrorUri);
        }
        const data = await tokenResponse.json();
        res.cookie(accessTokenCookieKey, data.access_token, { httpOnly: true, sameSite: 'strict' });
        res.cookie(refreshTokenCookieKey, data.refresh_token, { httpOnly: true, sameSite: 'strict' });
    } catch (err) {
        const redirectWithErrorUri = new URI(redirectURI).setQuery({ error: 'fetch_token' });
        return res.redirect(redirectWithErrorUri);
    }

    const redirectWithSuccess = new URI(redirectURI).setQuery({ success: 'true' });
    return res.redirect(redirectWithSuccess);
});

app.get('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies[refreshTokenCookieKey];

    if (!refreshToken) {
        return res.status(400).json({ message: 'Wrong request' });
    }

    const refreshTokenRequestBody = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    };
    try {
        const tokenResponse = await fetch(tokenURL, { method: 'POST', body: new URLSearchParams(refreshTokenRequestBody), headers: getBasicAuthHeaders() });
        if (!tokenResponse.ok) {
            return res.status(tokenResponse.code).json({ message: `Spotify API responded with ${tokenResponse.status}` });
        }
        const data = await tokenResponse.json();
        res.cookie(accessTokenCookieKey, data.access_token, { httpOnly: true, sameSite: 'strict' });
        return res.status(200).json({ message: 'Token refreshed' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
});

module.exports = app;
