const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.server.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [new webpack.WatchIgnorePlugin({ paths: [/\.js$/, /\.d\.ts$/] })],
});


