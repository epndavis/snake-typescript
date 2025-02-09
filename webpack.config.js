const path = require('path');

module.exports = {
  entry: './src/snake.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'snake.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
