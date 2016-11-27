var commonConfig = require('./webpack-common.config.js');
var webpack = require('webpack');
var path = require('path');

var devLoaders = [
    {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader!css"
    }
];

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:2992',
            'webpack/hot/only-dev-server',
            './app/js/main.js'
        ]
    },
    output: {
        path: './build',
        publicPath: '',
        filename: 'bundle.[hash].js'
    },
    externals: [],
    devtool: 'eval',
    devServer: {
        hot: true,
        contentBase: './app'
    },
    module: {
        loaders: commonConfig.loaders.concat(devLoaders)
    },
    resolve: {
        modulesDirectories: ['node_modules']
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
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        commonConfig.indexPagePlugin,
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true
        })
    ]
};
