import React from 'react'
import gql from 'graphql-tag'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import client from '../apollo'

const GET_USERS = gql`
  {
    _
  }
`

const Users = () => {
  const { error, loading } = useQuery(GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :-(</p>

  return <p>It works</p>
}

const App = () => (
  <ApolloProvider client={client}>
    <Users />
  </ApolloProvider>
)

export default App
