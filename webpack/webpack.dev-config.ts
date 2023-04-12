import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { getWebpackBaseConfig } from './webpack.base-config';
import { getWebpackDevServerConfig } from './webpack.dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

module.exports = function (): Configuration {
  return {
    ...getWebpackBaseConfig(),
    devServer: getWebpackDevServerConfig(),
  };
};
