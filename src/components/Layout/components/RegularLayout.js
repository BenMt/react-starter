import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const RegularLayout = props => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <div>
      The count is {props.count}
      <button onClick={props.increment}>increment</button>
      <button onClick={props.incrementAsync}>incrementAsync</button>
    </div>
    {props.children}
  </div>
)

const mapState = state => ({
  count: state.count
})

const mapDispatch = ({ count: { increment, incrementAsync } }) => ({
  increment: () => increment(1),
  incrementAsync: () => incrementAsync(1)
})

export default connect(mapState, mapDispatch)(RegularLayout)
