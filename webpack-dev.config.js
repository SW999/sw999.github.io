var commonConfig = require('./webpack-common.config.js');
var webpack = require('webpack');
var path = require('path');

var devLoaders = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader?optional=runtime']
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: "style!css?sourceMap!sass?sourceMap"
    }
];

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './react_app/main.js'
        ]
    },
    output: {
        path: './public',
        publicPath: 'http://localhost:3000/',
        filename: 'bundle.[hash].js'
    },
    externals: [],
    devtool: 'cheap-eval-source-map',
    devServer: {
        hot: true,
        contentBase: './react_app'
    },
    module: {
        loaders: commonConfig.loaders.concat(devLoaders)
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            'react' : path.resolve(__dirname, 'node_modules/react')
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
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true
        }),
        new webpack.ProvidePlugin({
            'React':      'react',
            '$':          'jquery',
            'jQuery':     'jquery',
            'ReactDOM':   'react-dom'
        })
    ]
};