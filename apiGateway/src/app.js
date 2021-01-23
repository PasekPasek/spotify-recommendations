const express = require('express');
const routes = require('./routes');

const app = express();

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('UI');
});

module.exports = app;
