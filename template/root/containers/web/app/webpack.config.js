const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV || 'development';
const useSourceMaps = env === 'development';
const removeUnusedMomentLocalePlugin = new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /nb|en/);

const clientBundleConfig = {
  entry: {
    nocms: ['@babel/polyfill', './src/client.js'],
    admin: './src/admin.js',
  },
  output: {
    path: path.join(__dirname, '/assets/js'),
    filename: '[name].js',
  },
  devtool: useSourceMaps ? 'inline-source-map' : false,
  resolve: {
    mainFields: ['main'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: path.join(__dirname, '/assets'),
        exclude: /bundle\.js$/,
      },
      {
        test: /\.jsx$|\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: env === 'production' ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    removeUnusedMomentLocalePlugin,
  ] : [removeUnusedMomentLocalePlugin],
};

const serverBundleConfig = {
  target: 'node',
  entry: {
    server: './index.js',
  },
  output: {
    path: path.join(__dirname, '/bin'),
    filename: 'index.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        exclude: '/node_modules',
        loader: 'babel-loader',
      },
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
};

module.exports = [serverBundleConfig, clientBundleConfig];
