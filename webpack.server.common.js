const path = require('path');
const nodeExternals = require('webpack-node-externals');

const basePath = path.join(__dirname, 'packages', 'server', 'src');

module.exports = {
  entry: [path.join(basePath, 'main.ts')],
  optimization: {
    minimize: false,
  },
  target: 'node',
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
    alias: {
      '@auth': path.resolve(basePath, 'auth'),
      '@config': path.resolve(basePath, 'config'),
      '@database': path.resolve(basePath, 'database'),
      '@models': path.resolve(basePath, 'database', 'models'),
      '@shared': path.resolve(basePath, 'shared'),
      '@dto': path.resolve(basePath, 'shared', 'dto'),
      '@user': path.resolve(basePath, 'user'),
      '@segment': path.resolve(basePath, 'segment'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist', 'server'),
    filename: 'server.bundle.js',
  },
};
