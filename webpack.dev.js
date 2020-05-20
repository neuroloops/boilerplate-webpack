const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      ignored: /node_modules/,
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              // eslint-disable-next-line
              plugins: [require('autoprefixer')()],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
});
