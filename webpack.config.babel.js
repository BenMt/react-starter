import webpack from 'webpack'
import path from 'path'

import { WEB_PORT, DEV_SERVER_PORT } from './app/config'

export default env => {
  return {
    entry: ['webpack-hot-middleware/client', './app/client'],
    output: {
      path: path.join(__dirname, 'tmp/static'),
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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1
        }
      })
    ]
  }
}
