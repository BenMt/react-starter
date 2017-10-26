import React from 'react'
import PropTypes from 'prop-types'
import { renderToString } from 'react-dom/server'

import { APP_REDUX_STATE, DEFAULT_LOCALE, WEB_PORT } from 'config'

const Html = ({ component, state }) => (
  <html lang={DEFAULT_LOCALE}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#82a8a3" />
    </head>
    <body>
      <div
        id="app-container"
        style={{ height: '100%' }}
        dangerouslySetInnerHTML={{ __html: renderToString(component) }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `window.${APP_REDUX_STATE}=${JSON.stringify(state)};`
        }}
      />

      {/* javascripts */}
      {/* (usually one for each "entry" in webpack configuration) */}
      {/* (for more informations on "entries" see https://github.com/petehunt/webpack-howto/) */}
      {/* {Object.keys(assets.javascript).map(script => (
        <script src={assets.javascript[script]} key={script.toString()} />
      ))} */}
      <script src={`http://localhost:${WEB_PORT}/vendor.bundle.js`} />
      <script src={`http://localhost:${WEB_PORT}/main.bundle.js`} />
    </body>
  </html>
)

Html.propTypes = {
  component: PropTypes.node.isRequired,
  state: PropTypes.object.isRequired
}

export default Html
