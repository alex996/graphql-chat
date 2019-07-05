import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Login = () => (
  <Fragment>
    <h1>Login</h1>
    <Link to='/register'>Register</Link>
  </Fragment>
)

export default Login
