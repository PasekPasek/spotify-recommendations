const express = require('express');
const config = require('config');

const app = express();
const port = config.get('Application.port');
const path = require('path');

app.use('/static', express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
