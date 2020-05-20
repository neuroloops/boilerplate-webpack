/* eslint-disable */
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
/* eslint-enable */
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCssPlugin(),
      new TerserJsPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
});
