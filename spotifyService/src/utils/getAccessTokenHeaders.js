const getAccessTokenHeaders = (accessToken) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
});

module.exports = getAccessTokenHeaders;
