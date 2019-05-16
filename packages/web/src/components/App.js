import React from 'react'
import gql from 'graphql-tag'
import { ApolloProvider, useQuery } from 'react-apollo-hooks'
import client from '../apollo'

const GET_USERS = gql`
  {
    users {
      id
      email
      name
    }
  }
`

const Users = props => {
  const { data, error, loading } = useQuery(GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :-(</p>

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

const App = props => (
  <ApolloProvider client={client}>
    <Users />
  </ApolloProvider>
)

export default App
