const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map', 
    devServer: {
        open: true,
        static: {
            directory: baseWebpackConfig.externals.paths.dist
        },
        watchFiles: {
            options: {
                ignored: /node_modules/
            }
        },
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map' // Настройка генерации карт
        })
    ]
});

module.exports = devWebpackConfig