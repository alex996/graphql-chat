const { gql } = require('apollo-server')

module.exports = gql`
  type Message {
    id: ID!
    body: String!
    user: User!
  }
`
