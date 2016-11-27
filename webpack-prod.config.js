var commonConfig = require('./webpack-common.config.js');
var webpack = require('webpack');
var WebpackStrip = require('strip-loader');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('styles.[chunkhash].css');
var path = require('path');

var prodLoaders = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: WebpackStrip.loader('console.log')
    },
    {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: extractCSS.extract('style-loader', 'css?minimize')
    }
];

module.exports = {
    entry: {
        app: ['./app/js/main.js']
    },
    output: {
        path: './build/',
        publicPath: './build/',
        filename: 'bundle.[hash].js'
    },
    module: {
        loaders: commonConfig.loaders.concat(prodLoaders)
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            minimize: true,
            beautify: false,
            comments: false,
            compress: {
                booleans    : true,
                loops       : true,
                unused      : true,
                warnings    : true,
                drop_console: true
            }
        }),
        commonConfig.indexPagePlugin,
        extractCSS
    ]
};
