import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'

import config from '../webpack/webpack.config.babel'

const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000')
})
