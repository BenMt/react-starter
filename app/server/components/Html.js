import React from 'react'
import PropTypes from 'prop-types'
import { renderToString } from 'react-dom/server'

import {
  isProd,
  APP_REDUX_STATE,
  DEFAULT_LOCALE,
  WEB_PORT,
  APP_CONTAINER,
  APP_COLOR
} from 'config'

const Html = ({ component, state, assets }) => (
  <html lang={DEFAULT_LOCALE}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content={APP_COLOR} />
    </head>
    <body>
      <div
        id={APP_CONTAINER}
        style={{ height: '100%' }}
        dangerouslySetInnerHTML={{ __html: renderToString(component) }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `window.${APP_REDUX_STATE}=${JSON.stringify(state)};`
        }}
      />

      {/* javascripts */}
      {isProd &&
        assets.app.js.map(script => <script src={script} key={script} />)}
      {!isProd && <script src={`http://localhost:${WEB_PORT}/vendor.js`} />}
      {!isProd && (
        <script src={`http://localhost:${WEB_PORT}/main.bundle.js`} />
      )}
    </body>
  </html>
)

Html.propTypes = {
  component: PropTypes.node.isRequired,
  state: PropTypes.object.isRequired,
  assets: PropTypes.object
}

export default Html
