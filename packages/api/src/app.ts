import express from 'express'
import session from 'express-session'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import { SESS_OPTIONS, APOLLO_OPTIONS } from './config'

const createApp = (store?: any) => {
  const app = express()

  app.use(
    session({
      store,
      ...SESS_OPTIONS
    })
  )

  const server = new ApolloServer({
    typeDefs,
    // @ts-ignore: See apollo-server#1775
    resolvers,
    schemaDirectives,
    ...APOLLO_OPTIONS
  })

  server.applyMiddleware({ app, cors: false })

  return { app, server }
}

export default createApp
