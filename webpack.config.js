const path = require('path')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDevServer = process.argv[1].includes('webpack-dev-server')
const filename = '[name]-[contenthash]'

module.exports = {
    mode: !isDevServer ? 'production' : 'development',
    devtool: !isDevServer ? '' : 'source-map',
    entry: './src/index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: `${filename}.js`,
        publicPath: isDevServer ? '/' : './',
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
        ],
        alias: {
            react: 'preact/compat',
            'react-dom': 'preact/compat',
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader',
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                },
            },
        },
    },
    plugins: [
        new Dotenv(),
        !isDevServer ? new CleanWebpackPlugin() : null,
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ].filter(Boolean),
    devServer: {
        headers: {
            'Cache-Control': 'max-age: 31557600',
        },
        overlay: true,
        stats: {
            children: false,
            modules: false,
        },
    },
    stats: {
        entrypoints: false,
        modules: false,
    },
}
