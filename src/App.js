import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home, Login } from './pages'
import routes from './routes'

const App = props => (
  <Switch>{routes.map(route => <Route {...route} />)}</Switch>
)

export default App
