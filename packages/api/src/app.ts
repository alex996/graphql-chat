import express from 'express'
import session from 'express-session'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import { SESS_OPTIONS, APOLLO_OPTIONS } from './config'
import { Request, Response } from './types'
import { ensureSignedIn } from './auth'

const createApp = (store?: session.Store) => {
  const app = express()

  const sessionHandler = session({
    store,
    ...SESS_OPTIONS
  })

  app.use(sessionHandler)

  const server = new ApolloServer({
    ...APOLLO_OPTIONS,
    typeDefs,
    resolvers,
    schemaDirectives,
    context: ({ req, res, connection }) =>
      connection ? connection.context : { req, res },
    subscriptions: {
      onConnect: async (connectionParams, webSocket, { request }) => {
        const req = await new Promise(resolve => {
          sessionHandler(request as Request, {} as Response, () => {
            // Directives are ignored in WS; need to auth explicitly
            ensureSignedIn(request as Request)

            resolve(request)
          })
        })

        return { req }
      }
    }
  })

  server.applyMiddleware({ app, cors: false })

  return { app, server }
}

export default createApp
