import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export const getWebpackPlugins = () => [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(process.cwd(), 'public', 'index.html'),
    favicon: './public/favicon.ico',
    hash: true,
    scriptLoading: 'defer',
  }),
  new CopyWebpackPlugin({
    patterns: [
      './public/.htaccess',
      './public/robots.txt',
      './public/manifest.json',
    ],
  }),
];
