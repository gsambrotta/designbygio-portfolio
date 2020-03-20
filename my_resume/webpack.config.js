'use strict';

const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: 'eval',
  entry: [
    './scripts/app.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: true,

  plugins: [ 
      new webpack.ProvidePlugin({
        d3: 'd3',
        $: 'jquery'
      })
  ],

  module: {

    loaders: [
      {
        test: /\.hbs$/, loader: 'handlebars-loader',
        query: {
              partialDirs: [
                  path.join(__dirname, 'templates', 'partials')
              ]
            }     
      },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.(jpe?g|png|gif|svg)$/i, loaders: [ 'url?limit=8192', 'img'] }
    ],
    resolve: {
      modulesDirectories: [
        'node_modules'
      ]        
    }
  }
};

module.exports = config;
