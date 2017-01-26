var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  loaders: [

    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?optional=runtime']
    }
  ],

  indexPagePlugin: new HtmlWebpackPlugin({
    inject: 'body',
    filename: 'index.html',
    template: './angular/public/index.html'
  })
};
