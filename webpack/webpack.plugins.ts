import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

export const getWebpackPlugins = () => [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(process.cwd(), 'public', 'index.html'),
    favicon: './public/favicon.ico',
    hash: true,
    scriptLoading: 'defer',
    title: 'White Planner App | Beta version',
  }),
  new CopyWebpackPlugin({
    patterns: [
      './public/.htaccess',
      './public/robots.txt',
      './public/manifest.json',
    ],
  }),
];
