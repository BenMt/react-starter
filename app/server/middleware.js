import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter as Router } from 'react-router'
import { matchPath } from 'react-router-dom'

import App from '../client/app'
import createStore from '../client/modules/redux/store'
import routes from '../client/pages/routes'

import { Html } from '../client/modules/app'

export const middleware = (req, res) => {
  console.log(`URL => ${req.url}`)
  const store = createStore()

  const promises = []
  routes.some(route => {
    const match = matchPath(req.url, route)
    if (match && route.loadData) promises.push(route.loadData(match))
    return match
  })

  Promise.all(promises).then(() => {
    const context = {}
    const Root = (
      <Provider store={store}>
        <Router location={req.url} context={context}>
          <App />
        </Router>
      </Provider>
    )

    const rendered = renderToString(
      <Html component={Root} state={store.getState()} />
    )
    res.status(200).send(`<!doctype html>${rendered}`)
  })
}
