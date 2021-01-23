const config = require('config');
const app = require('./src/app');

const port = config.get('Application.port');

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
