import webpack from 'webpack'
import path from 'path'
import express from 'express'
import { readFileSync } from 'jsonfile'

import { middleware } from './middleware'
import { isProd, WEB_PORT } from '../config'

// Create app
const app = express()

// set statics
const staticPath = path.join(__dirname, '../../', 'static')
app.use(express.static(staticPath))

const assetsPath = `${process.cwd()}/build/static/webpack-assets.json`
const assets = isProd ? readFileSync(assetsPath) : false

if (!isProd) {
  const config = require('../../webpack.config.babel').default({})
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
  middleware(req, res, assets)
})

// start app
app.listen(WEB_PORT, () => {
  console.info(
    `---\nListening on port ${WEB_PORT} in ${process.env
      .NODE_ENV} mode on Node ${process.version}.\n`
  )
})
