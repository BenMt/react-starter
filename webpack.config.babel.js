import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'
import path from 'path'

import { WEB_PORT, DEV_SERVER_PORT } from './app/config'

export default env => {
  const removeEmpty = array => array.filter(i => !!i)
  return {
    entry: env.prod
      ? { app: './app/client/index.js' }
      : ['webpack-hot-middleware/client', './app/client'],
    output: {
      path: path.join(__dirname, 'build/static'),
      publicPath: '/',
      filename: env.prod ? '[name].[chunkhash].js' : '[name].bundle.js'
    },
    devtool: env.prod ? 'eval' : 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
          include: path.join(__dirname, './app/client')
        }
      ]
    },
    plugins: removeEmpty([
      !env.prod && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: env.prod ? 'vendor.[hash].js' : 'vendor.js',
        minChunks: function(module) {
          return module.context && module.context.indexOf('node_modules') !== -1
        }
      }),
      env.prod &&
        new AssetsPlugin({
          fullPath: false,
          includeManifest: 'manifest',
          path: path.join(__dirname, 'build/static')
        })
    ])
  }
}
