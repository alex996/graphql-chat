import React from 'react'
import {
  RouteProps,
  Redirect,
  RouteComponentProps,
  Route
} from 'react-router-dom'

interface ProtectedRouteProps extends RouteProps {
  auth: boolean
}

const ProtectedRoute = ({
  auth,
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const handleRender = (props: RouteComponentProps) => {
    if (auth) {
      // @ts-ignore FIXME:
      return <Component {...props} />
    }

    return <Redirect to='/login' />
  }

  return <Route {...rest} render={handleRender} />
}

export default ProtectedRoute
