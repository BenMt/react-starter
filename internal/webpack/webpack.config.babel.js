import path from 'path'
import webpack from 'webpack'
import HtmlWebPackPlugin from 'html-webpack-plugin'

export default {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'app.[hash].js',
    publicPath: '/'
  },
  // resolve: {
  //   modules: [
  //     path.join(__dirname, './src'),
  //     path.join(__dirname, './node_modules')
  //   ],
  //   alias: {
  //     src: path.join(__dirname, 'src')
  //   }
  // },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
