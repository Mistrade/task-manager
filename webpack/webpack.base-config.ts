import path from 'path';
import { WebpackConfiguration } from 'webpack-cli';
import { getWebpackPlugins } from './webpack.plugins';
import { getWebpackResolve } from './webpack.resolve';
import { getWebpackRules } from './webpack.rules';

export const getWebpackBaseConfig = (): WebpackConfiguration => ({
  mode: 'development',
  entry: [path.join(process.cwd(), 'src', 'index.tsx')],
  output: {
    clean: true,
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/',
    filename: 'app.js',
  },
  resolve: getWebpackResolve(),
  module: {
    rules: getWebpackRules(),
  },
  plugins: getWebpackPlugins(),
});
