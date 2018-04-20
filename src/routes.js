import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Login } from './pages'

export default [
  {
    path: '/',
    exact: true,
    component: Home,
    loadData: () => {}
  },
  {
    path: '/login',
    exact: true,
    component: Login,
    loadData: () => {}
  }
]
