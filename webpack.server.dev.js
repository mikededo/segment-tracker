const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

const common = require('./webpack.server.common.js');

module.exports = merge(common, {
  entry: ['webpack/hot/poll?100'],
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({ paths: [/\.js$/, /\.d\.ts$/] }),
    new RunScriptWebpackPlugin({
      name: 'server.bundle.js',
    }),
  ],
});
