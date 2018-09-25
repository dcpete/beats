const path = require('path');
const webpack = require('webpack');
const html = require('html-webpack-plugin');
const clean = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    vendors: [
      'body-parser',
      'react',
      'react-dom',
      'react-redux',
      'reactstrap',
      'redux',
      'redux-thunk'
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              enforce: true,
              chunks: 'all'
          }
      }
    }
  },
  plugins: [
    new clean(['dist']),
    new html({
      title: 'beats',
      template: 'src/assets/html/index.html'
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,

        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      },
      {
        test: /\.(png|svg|jpg|gif|xml|ico|wav|webmanifest)$/,
        use: [{
          loader: 'file-loader',

          options: {
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      }
    ]
  }
};
