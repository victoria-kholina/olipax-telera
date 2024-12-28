const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    styles: 'css/',
    assets: 'assets/',
    services: 'services'
};


// Автоматическое добавление EJS файлов. И преобразование их в html

const ejsFiles = fs.readdirSync(`${PATHS.src}`).filter(file => file.endsWith('.ejs'));

const htmlPlugins = ejsFiles.map(file => {
    return new HtmlWebpackPlugin({
        template: path.join(PATHS.src, file),
        filename: file.replace('.ejs', '.html'),
    });
});

const ejsFilesServices = fs.readdirSync(`${PATHS.src}/${PATHS.services}`).filter(file => file.endsWith('.ejs'));

const htmlPluginsServices = ejsFilesServices.map(file => {
    return new HtmlWebpackPlugin({
        template: path.join(PATHS.src, PATHS.services, file),
        filename: `${PATHS.services}/${file.replace('.ejs', '.html')}`,
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
                test: /\.ejs$/i,
                use: ['html-loader', 'template-ejs-loader'],
            },
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
                test: /\.(png|jpg|gif|svg|webp)$/i,
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
        ...htmlPluginsServices,
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