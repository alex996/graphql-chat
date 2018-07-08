const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')

const {
  DB_USERNAME = 'admin',
  DB_PASSWORD = 'secret',
  DB_HOST = '172.17.0.2',
  DB_PORT = 27017,
  DB_NAME = 'chat'
} = process.env

mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then(() => {
    const books = [
      {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling'
      },
      {
        title: 'Jurassic Park',
        author: 'Michael Crichton'
      }
    ]

    const typeDefs = gql`
      type Book {
        title: String
        author: String
      }

      type Query {
        books: [Book]
      }
    `

    const resolvers = {
      Query: {
        books: () => books
      }
    }

    return new ApolloServer({ typeDefs, resolvers }).listen()
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
  .catch(console.error)
