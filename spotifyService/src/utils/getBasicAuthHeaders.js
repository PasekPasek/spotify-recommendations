const config = require('config');

const getBasicAuthHeaders = () => {
    const { clientId, clientSecret } = config.get('SpotifyConfig');
    const base64EncodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    return {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: `Basic ${base64EncodedCredentials}`,
    };
};

module.exports = getBasicAuthHeaders;
