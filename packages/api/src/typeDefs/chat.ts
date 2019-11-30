import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    startChat(title: String, userIds: [ID!]!): Chat @auth
    inviteUsers(chatId: ID!, userIds: [ID!]!): Chat @auth
  }

  type Chat {
    id: ID!
    title: String
    users: [User!]!
    messages: [Message!]!
    lastMessage: Message
    createdAt: String!
    updatedAt: String!
  }
`
