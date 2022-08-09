const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: "production",
    entry: [path.join(process.cwd(), 'src', 'index')],
    output: {
        clean: true,
        path: path.join(process.cwd(), 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'Проект собран с помощью вебпак',
            meta: {
                author: 'Черников Андрей Юреьвич (andreimistrade@icloud.com)',
                keywords: 'Планирование, Календарь, 2022, 2023, 2021, Планирование дел, распорядок дня, задачи, события, ивенты, ежедневник',
                description: 'Онлайн-сервис для планирования личных дел и задач.'
            },
            favicon: "./public/favicon.ico"
        }),
        new CopyWebpackPlugin({
            patterns: [
                './public/robots.txt',
                './public/.htaccess',
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {}
            },
            {
                test: /\.txt/,
                use: 'raw-loader',
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader',
                }
                ],
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    optimization: {}
}