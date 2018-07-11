const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatarUrl: String
    chats: [Chat!]!
  }

  extend type Query {
    user(id: ID!): User!
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!): User!
  }
`
