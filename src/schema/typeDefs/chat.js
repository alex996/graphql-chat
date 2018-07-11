const { gql } = require('apollo-server')

module.exports = gql`
  type Chat {
    id: ID!
    name: String
    users: [User!]!
    messages: [Message!]!
  }
`
