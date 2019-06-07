import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    sendMessage(chatId: ID!, body: String!): Message @auth
  }

  type Message {
    id: ID!
    body: String!
    sender: User!
    createdAt: String!
    updatedAt: String!
  }
`
