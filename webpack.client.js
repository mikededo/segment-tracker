const path = require('path');
const HtmlWebPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'packages', 'client', 'src', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'dist', 'client'),
    publicPath: '/',
    filename: 'client.bundle.js',
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  target: 'node',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
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
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPlugin({
      template: path.join(__dirname, 'packages', 'client', 'src', 'index.html'),
    }),
  ],
};
