var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  loaders: [
    {
      test: /\.js$/,
      exclude: ['/node_modules/', '/build'],
      loaders: ['babel-loader?stage=2&optional=runtime']
    }
  ],
  indexPagePlugin: new HtmlWebpackPlugin({
                          inject: true,
                          title: 'BuzzFeed top news',
                          favicon: './app/favicon.ico',
                          filename: '../index.html',
                          template: './app/index_template.html'
                        })
};
