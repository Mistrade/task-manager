import WebpackDevServer from 'webpack-dev-server';

export const getWebpackDevServerConfig =
  (): WebpackDevServer.Configuration => ({
    historyApiFallback: true,
    hot: true,
    port: 8080,
  });
