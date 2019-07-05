import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => (
  <Fragment>
    <h1>Welcome</h1>
    <Link to='/login'>Login</Link>
    <Link to='/register'>Register</Link>
    <Link to='/home'>Home</Link>
  </Fragment>
)

export default Welcome
