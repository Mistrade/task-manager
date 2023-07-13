import path from 'path';

export const getWebpackResolve = () => ({
  alias: {
    '@core': path.resolve(process.cwd(), './src/core'),
    '@planner': path.resolve(process.cwd(), './src/pages/planner'),
    '@api': path.resolve(process.cwd(), './src/store/api'),
    '@redux-hooks': path.resolve(process.cwd(), './src/store/hooks'),
    '@redux': path.resolve(process.cwd(), './src/store'),
    '@selectors': path.resolve(process.cwd(), './src/store/selectors'),
    '@contacts': path.resolve(process.cwd(), './src/pages/contacts'),
    '@hooks': path.resolve(process.cwd(), './src/hooks'),
    '@pages': path.resolve(process.cwd(), './src/pages'),
    '@components': path.resolve(process.cwd(), './src/components'),
    '@src': path.resolve(process.cwd(), './src'),
    '@planner-reducer': path.resolve(
      process.cwd(),
      './src/store/reducers/planner'
    ),
  },
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  modules: [path.resolve(process.cwd(), './node_modules')],
});
