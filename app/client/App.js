import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { routes } from 'pages'

const App = () => (
  <Switch>{routes.map(route => <Route key={route} {...route} />)}</Switch>
)

export default App
