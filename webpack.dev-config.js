const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: "development",
    entry: path.join(process.cwd(), 'src', 'index'),
    output: {
        clean: true,
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/'
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: "index.html",
            favicon: './public/favicon.ico',
        }),
        new CopyWebpackPlugin({
            patterns: [
                './public/.htaccess',
                './public/robots.txt',
                './public/manifest.json'
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: [
            path.resolve(process.cwd(), './node_modules')
        ]
    },
    devServer: {
        historyApiFallback: true
    }
}