/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.dev.js');

const port = config.get('Application.port');

const compiler = webpack(config);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    }),
);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!\n`);
});
