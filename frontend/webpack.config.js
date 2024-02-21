const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: 'public', to: '.' }],
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: { limit: false },
            },
        ],
    },
    entry: './src/index.js',
    devServer: {
        port: 3000,
        liveReload: true,
    },
};
