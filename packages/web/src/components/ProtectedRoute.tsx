import React, { FC } from 'react'
import {
  RouteProps,
  Redirect,
  RouteComponentProps,
  Route
} from 'react-router-dom'

interface ProtectedRouteProps extends RouteProps {
  auth: boolean
  component: FC<RouteComponentProps>
}

const ProtectedRoute = ({
  auth,
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  return <Route {...rest} render={(props: RouteComponentProps) => {
    if (auth) {
      return <Component {...props} />
    }

    return <Redirect to='/login' />
  }} />
}

export default ProtectedRoute
