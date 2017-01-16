var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  loaders: [

  {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
      loader: 'url?limit=10000&name=[name].[ext]'
  }, 

  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader?optional=runtime']
  }
  ],

  indexPagePlugin: new HtmlWebpackPlugin({
    inject: 'head',
    title: 'Test react app',
    favicon: './react_app/favicon.ico',
    filename: 'index.html',
    template: './react_app/index_template.html'
  })
};
