import { WebpackConfiguration } from 'webpack-cli';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const getWebpackRules = (): WebpackConfiguration['module']['rules'] => {
  return [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
  ];
};
