import React, { FC } from 'react'
import {
  RouteProps,
  Redirect,
  RouteComponentProps,
  Route
} from 'react-router-dom'
import { isLoggedIn } from '../auth'

interface Props extends RouteProps {
  allowed: boolean
  redirectTo: string
}

const ProtectedRoute: FC<Props> = ({
  allowed,
  redirectTo,
  component: Component,
  render,
  children,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props: RouteComponentProps) => {
      if (allowed) {
        if (Component) {
          return <Component {...props} />
        } else if (render) {
          return render(props)
        } else {
          return children
        }
      }

      return <Redirect to={redirectTo} />
    }}
  />
)

export const PrivateRoute: FC<RouteProps> = props => (
  <ProtectedRoute {...props} allowed={isLoggedIn()} redirectTo='/login' />
)

export const PublicRoute: FC<RouteProps> = props => (
  <ProtectedRoute {...props} allowed={!isLoggedIn()} redirectTo='/home' />
)
