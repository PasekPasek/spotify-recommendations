/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('config');
const path = require('path');

const app = express();
const webpackConfig = require('./webpack.dev.js');

const port = config.get('Application.port');

const compiler = webpack(webpackConfig);
app.use(webpackHotMiddleware(compiler));

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
    }),
);

app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        return res.end();
    });
});

app.listen(port, () => {
    console.log(`UI app listening on port ${port}!\n`);
});
