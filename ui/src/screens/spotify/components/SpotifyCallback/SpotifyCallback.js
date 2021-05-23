import React, { useEffect } from 'react';
import URI from 'urijs';
import { postBcMessage } from '../../../../utils/authBroadcastChannel';

export default () => {
    useEffect(() => {
        const params = window.location.search;
        const parsedQuery = URI.parseQuery(params);
        postBcMessage(parsedQuery);
        window.close();
    }, []);
    return <p>Please wait...</p>;
};
