import React from 'react'
import { hydrate as render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import createStore from 'modules/redux/store'

import { isProd, APP_CONTAINER, APP_REDUX_STATE } from 'config'

const preloadedState = window[APP_REDUX_STATE]
const store = createStore(preloadedState)

const renderApp = Component => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById(APP_CONTAINER)
  )
}

renderApp(App)

// Webpack Hot Module Replacement API
if (!isProd && module.hot) {
  module.hot.accept()
}
