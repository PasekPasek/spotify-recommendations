const express = require('express');
const config = require('config');

const app = express();
const port = config.get('Application.port');

app.use(express.static('dist'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
