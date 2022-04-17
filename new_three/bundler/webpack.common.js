const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')


module.exports = {
    entry: {
        // index: [path.resolve(__dirname, '../src/script.js')],
        three: [path.resolve(__dirname, '../src/script.js')],
        synth: [path.resolve(__dirname, '../src/synth/sketch.js')],
        tictactoe: [path.resolve(__dirname, '../src/tictactoe/tictactoe.js')],
      },
    // entry: path.resolve(__dirname, '../src/script.js'),
    output:
    {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: "index.html",
            minify: true
        }),
        new HtmlWebpackPlugin({
            title: 'THREE',
            template: path.resolve(__dirname, '../src/three.html'),
            filename: "three.html",
            minify: true
        }),
        new HtmlWebpackPlugin({
            title: 'tictactoe',
            template: path.resolve(__dirname, '../src/tictactoe/tictactoe.html'),
            filename: "tictactoe.html",
            minify: true
        }),
        new HtmlWebpackPlugin({
            title: 'synth',
            template: path.resolve(__dirname, '../src/synth/synth.html'),
            filename: "synth.html",
            minify: true
        }),
        new MiniCSSExtractPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },
            //models
            {
                test: /\.(gltf)$/,
                use:
                [
                    {
                        loader: 'raw-loader',
                        options:
                        {
                            outputPath: 'assets/models/'
                        }
                    }
                ]
            },
        ]
    }
}
