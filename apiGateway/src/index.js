const config = require('config');
const https = require('https');
const fs = require('fs');

const app = require('./app');

const {
    port, httpsEnabled, sslCert, sslKey,
} = config.get('Application');

let server = app;

if (httpsEnabled && sslCert && sslKey) {
    app.enable('trust proxy');

    app.use((req, res, next) => {
        if (req.secure) {
            next();
        } else {
            res.redirect(`https://${req.headers.host}${req.url}`);
        }
    });

    server = https.createServer({
        key: fs.readFileSync(sslKey),
        cert: fs.readFileSync(sslCert),
    }, app).listen(port, () => {
        console.log(`App listening at port ${port}`);
    });
}

server.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
