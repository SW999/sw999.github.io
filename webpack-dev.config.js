var commonConfig = require('./webpack-common.config.js');
var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isDev = ENV === 'build';

var devLoaders = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?optional=runtime']
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: isTest ? "null-loader" : "style!css?sourceMap!sass?sourceMap"
    },
    {
      test: /\.html$/,
      loader: 'raw-loader'
    },
    {
        test: require.resolve('angular'),
        loader: 'exports?window.angular'
    }
];

// ISTANBUL LOADER
// https://github.com/deepsweet/istanbul-instrumenter-loader
// Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
// Skips node_modules and files that end with .test
if (isTest) {
    devLoaders.push({
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
            /node_modules/,
            /\.spec\.js$/
        ],
        loader: 'istanbul-instrumenter-loader',
        query: {
            esModules: true
        }
    })
}

module.exports = {
    entry: isTest ? void 0 : {
        app: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './angular/app/app.js'
        ]
    },
    output: isTest ? {} : {
        path: __dirname + '/public',
        publicPath: 'http://localhost:3000/',
        filename: 'bundle.[hash].js'
    },
    devtool: 'eval',
    devServer: {
        hot: true,
        quiet: true,
        contentBase: './angular/public',
        stats: 'minimal'
    },
    module: {
        loaders: commonConfig.loaders.concat(devLoaders)
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            'angular' : path.resolve(__dirname, 'node_modules/angular')
        }
    },
    watchOptions: {
        aggregateTimeout: 100,
        poll: 700
    },
    performance: {
        hints: true,
        maxBundleSize: 250,
        warnAtPercent: 80
    },
    plugins: isTest ? [] : [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        commonConfig.indexPagePlugin,
        new CopyWebpackPlugin([{
          from: __dirname + '/angular/public'
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true
        }),
        new webpack.ProvidePlugin({
            'angular':    'angular' ,
            '$':          'jquery',
            'jQuery':     'jquery'
        })
    ]
};
