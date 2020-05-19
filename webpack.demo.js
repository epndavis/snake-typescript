const path = require('path');
const config = require('./webpack.config')
const merge = require('webpack-merge')

module.exports = merge(config, {
  entry: './demo/app.js',
  mode: 'development',
  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'demo'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    compress: true,
    port: 9000
  }
})
