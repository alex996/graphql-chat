const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('./schema')

const {
  DB_USERNAME = 'admin',
  DB_PASSWORD = 'secret',
  DB_HOST = '127.0.0.1',
  DB_PORT = 27017,
  DB_NAME = 'chat'
} = process.env

mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then(() => new ApolloServer({ typeDefs, resolvers }).listen())
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
  .catch(console.error)
