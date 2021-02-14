import React, { useEffect } from 'react';

export default () => {
    useEffect(() => {
        const params = window.location.search;
        const channel = new BroadcastChannel('spotify-auth');
        channel.postMessage(params);
        window.close();
    }, []);
    return <p>Please wait...</p>;
};
