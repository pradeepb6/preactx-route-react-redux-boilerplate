/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const defaultConfig = require('./webpack.config')

module.exports = merge(defaultConfig, {
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
})
