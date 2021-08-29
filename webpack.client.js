const path = require('path');
const HtmlWebPlugin = require('html-webpack-plugin');

const basePath = path.join(__dirname, 'packages', 'client', 'src');

module.exports = {
  entry: path.join(basePath, 'index.tsx'),
  output: {
    path: path.join(__dirname, 'dist', 'client'),
    publicPath: '/',
    filename: 'client.bundle.js',
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      '@api': path.resolve(basePath, 'api'),
      '@config': path.resolve(basePath, 'config'),
      '@context': path.resolve(basePath, 'context'),
      '@interfaces': path.resolve(basePath, 'interfaces'),
      '@routes': path.resolve(basePath, 'routes'),
      '@views': path.resolve(basePath, 'views'),
    },
  },
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPlugin({
      template: path.join(basePath, 'index.html'),
    }),
  ],
};
