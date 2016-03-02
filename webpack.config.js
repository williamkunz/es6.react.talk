'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: '#source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/main'
  ],

  output: {
    path: path.resolve(__dirname, 'dist', 'local'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'client'
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'views/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __CURRENT_ENV__: JSON.stringify('local'),
      __API__: (process.env.SERVER_ENDPOINT) ? JSON.stringify(process.env.SERVER_ENDPOINT) : JSON.stringify('http://localhost:4000')
    })
  ],

  devServer: {
    port: 8080,
    historyApiFallback: true
  },

  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'client')
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }]
  }
};
