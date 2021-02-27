import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addBcMessageListener } from '../utils/authBroadcastChannel';

export const SpotifyAuthContext = createContext();
const callbackUrl = '/spotify-auth-callback';
const authPopupUrl = `/api/spotify/authorize?redirectUri=${encodeURI(callbackUrl)}`;
const userDataUrl = '/api/spotify/user';

export const SpotifyAuthProvider = ({ children }) => {
    const [isLoggedIn, setLogin] = useState(false);
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getUserData = async () => {
        setIsLoading(true);
        try {
            const userDataResponse = await fetch(userDataUrl);
            if (!userDataResponse.ok) {
                return;
            }
            const userDataJson = await userDataResponse.json();
            setUserData(userDataJson);
            setLogin(true);
        } catch (err) {
            console.error('Problem with fetching user data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    let windowObjectReference = null;
    const handleLogin = () => {
        setIsLoading(true);
        const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
        // TODO: move to config

        if (windowObjectReference === null || windowObjectReference?.closed) {
            windowObjectReference = window.open(authPopupUrl, 'spotify_auth_window', strWindowFeatures);
        } else {
            windowObjectReference.focus();
        }
    };

    const receiveMessage = (event) => {
        const { data: { success, error } } = event;

        if (!error && success) {
            getUserData();
        }
    };

    addBcMessageListener((event) => receiveMessage(event), false);

    const providerValue = {
        handleLogin,
        isLoggedIn,
        userData,
        isLoading,
    };

    return (
        <SpotifyAuthContext.Provider value={providerValue}>
            {children}
        </SpotifyAuthContext.Provider>
    );
};

SpotifyAuthProvider.propTypes = {
    children: PropTypes.element.isRequired,
};
