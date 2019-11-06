import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { NavBar, Welcome, Home, Login, Register, NotFound } from './views'
import { PublicRoute, PrivateRoute } from './components'
import client from './apollo'

const Main = styled('main')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('sm')]: {
    marginTop: 64
  },
  [theme.breakpoints.only('xs')]: {
    marginTop: 56
  }
}))

const App = () => (
  <ApolloProvider client={client}>
    <CssBaseline />
    <BrowserRouter>
      <NavBar />
      <Main>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <PublicRoute path='/login' component={Login} />
          <PublicRoute path='/register' component={Register} />
          <PrivateRoute path='/home' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Main>
    </BrowserRouter>
  </ApolloProvider>
)

export default App
