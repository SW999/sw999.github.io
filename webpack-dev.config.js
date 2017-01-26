var commonConfig = require('./webpack-common.config.js');
var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

var devLoaders = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?optional=runtime']
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: "style!css?sourceMap!sass?sourceMap"
    },
    {
      test: /\.html$/,
      loader: 'raw-loader'
    }
];

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './angular/app/app.js'
        ]
    },
    output: {
        path: __dirname + '/public',
        publicPath: 'http://localhost:3000/',
        filename: 'bundle.[hash].js'
    },
    externals: [],
    devtool: 'cheap-eval-source-map',
    devServer: {
        hot: true,
        quiet: true,
        contentBase: './angular/public'
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
    plugins: [
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
            '$':          'jquery',
            'jQuery':     'jquery'
        }),
        new DashboardPlugin(dashboard.setData)
    ]
};
