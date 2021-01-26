const express = require('express');
const config = require('config');

const routes = require('./routes');

const uiEndpoint = config.get('Enpoints.ui');
const app = express();

app.use('/api', routes);

app.get('/', (req, res) => {
    res.redirect(uiEndpoint);
});

module.exports = app;
