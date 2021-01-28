/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('config');

const app = express();
const webpackConfig = require('./webpack.dev.js');

const port = config.get('Application.port');

const compiler = webpack(webpackConfig);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
    }),
);

app.use(webpackHotMiddleware(compiler));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!\n`);
});
