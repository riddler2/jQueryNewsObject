const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const srcDir = path.resolve(__dirname, 'src');
const nodeModPath = path.resolve(__dirname, 'node_modules');
const extractPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
        'A': path.resolve(__dirname, 'src/js/newsList.js'),
        'B': path.resolve(__dirname, 'src/js/newsInfo.js'),
        'vendor': ['bootstrap', 'jquery']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }, {
                test: /\.stylus$/,
                use: extractPlugin.extract({
                    fallback: {
                        loader: 'style-loader'
                    },
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'stylus-loader'
                    }]
                })
            }, {
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        publicPath: '../img/',
                        outputPath: 'img/',
                    }
                }]
            },
            {
                test: /\.(woff2?|woff|eot|svg|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            // {
            //     test: /\.html$/,
            //     loader: "html-loader"
            // },
            // {
            //     loader: 'html-loader',
            //     options: {
            //         ignoreCustomFragments: [/\{\{.*?}}/],
            //         root: path.resolve(__dirname, 'img'),
            //         attrs: ['img:src', 'img:data-src']
            //     }
            // },
        ]
    },
    resolve: {
        extensions: ['.js', ".css"],
        modules: [srcDir, nodeModPath],
        alias: {
            jquery: path.resolve(__dirname, 'src/lib/jquery.js'),
            bootstrap: path.resolve(__dirname, 'src/lib/bootstrap.js'),
            bootcss: path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css')
        }
    },
    plugins: [
        new extractPlugin('css/[name].css'),
        new CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/newsList.html'),
            filename: 'newsList.html',
            chunks: ['vendor', 'A']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/newsInfo.html'),
            filename: 'newsInfo.html',
            chunks: ['vendor', 'B']
        }),
    ],
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        contentBase: false,
        port: "8080",
        open: true,
        hot: false,
        openPage: 'newsList.html',
        allowedHosts: [
            "localhost:80"
        ],
        proxy: {
            '/api': {
                target: 'http://haoyu9558.site/server/news',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
        }
    },
}