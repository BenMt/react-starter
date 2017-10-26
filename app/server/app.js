import webpack from 'webpack'
import path from 'path'
import express from 'express'

import webpackConfig from '../../webpack.config.babel'
import { middleware } from './middleware'
import { isProd, WEB_PORT } from '../config'

// Create app
const app = express()

// set statics
const staticPath = path.join(__dirname, '../../', 'static')
app.use(express.static(staticPath))

if (!isProd) {
  const config = webpackConfig({})
  const compiler = webpack(config)

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true,
        chunks: false,
        chunkModules: false
      }
    })
  )
  app.use(require('webpack-hot-middleware')(compiler))
}

app.get('*', (req, res) => {
  middleware(req, res)
})

// start app
app.listen(WEB_PORT, () => {
  console.info(
    `---\nListening on port ${WEB_PORT} in ${process.env
      .NODE_ENV} mode on Node ${process.version}.\n`
  )
})
