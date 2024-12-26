const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    styles: 'css/',
    assets: 'assets/'
};

// Автоматическое добавление всех HTML файлов
const htmlFiles = fs.readdirSync(`${PATHS.src}`).filter(file => file.endsWith('.html'));
const htmlPlugins = htmlFiles.map(file => {
    return new HtmlWebpackPlugin({
        template: `${PATHS.src}/${file}`,
        filename: file
    });
});

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: PATHS.src,
    output: {
        filename: `js/[name].js`,
        path: PATHS.dist,
        clean: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.assets}img/[name][ext]`
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.assets}fonts/[name][ext]`
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.styles}[name].css`
        }),
        ...htmlPlugins, // Автоматически подключаем все HTML-файлы
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/${PATHS.assets}css`, to: `${PATHS.dist}/${PATHS.assets}css` },
                { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.dist}/${PATHS.assets}img` },
                { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.dist}/${PATHS.assets}fonts` },
                { from: `${PATHS.src}/php`, to: `${PATHS.dist}/php` }
            ]
        })
    ]
}