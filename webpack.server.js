const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

const prod =
  typeof process.env.NODE_ENV !== 'undefined' &&
  process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    'webpack/hot/poll?100',
    path.join(__dirname, 'packages', 'server', 'src', 'main.ts'),
  ],
  optimization: {
    minimize: false,
  },
  target: 'node',
  mode: prod ? 'production' : 'development',
  devtool: prod ? false : 'inline-source-map',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({ paths: [/\.js$/, /\.d\.ts$/] }),
    new RunScriptWebpackPlugin({
      name: 'server.bundle.js',
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist', 'server'),
    filename: 'server.bundle.js',
  },
};
