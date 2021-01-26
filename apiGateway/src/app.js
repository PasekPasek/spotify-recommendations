const express = require('express');
const config = require('config');
const proxy = require('express-http-proxy');

const routes = require('./routes');

const uiEndpoint = config.get('Enpoints.ui');
const app = express();

app.use('/api', routes);

app.get('*', proxy(uiEndpoint));

module.exports = app;
