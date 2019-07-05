import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Welcome, Home, Login, Register, NotFound } from './views'
import client from './apollo'

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/home' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
)

export default App
