/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});
