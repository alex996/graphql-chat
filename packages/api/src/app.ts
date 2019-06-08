import express from 'express'
import session from 'express-session'
import { ApolloServer } from 'apollo-server-express'
import { ExecutionParams } from 'subscriptions-transport-ws'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import { SESS_OPTIONS, APOLLO_OPTIONS } from './config'
import { Request, Response } from './types'
import { ensureSignedIn } from './auth'

const createApp = (store?: any) => {
  const app = express()

  const sessionHandler = session({
    store,
    ...SESS_OPTIONS
  })

  app.use(sessionHandler)

  const server = new ApolloServer({
    typeDefs,
    // @ts-ignore: See apollo-server#1775
    resolvers,
    schemaDirectives,
    context: ({
      req,
      res,
      connection
    }: {
      req: Request
      res: Response
      connection: ExecutionParams
    }) => (connection ? connection.context : { req, res }),
    subscriptions: {
      onConnect: async (connectionParams, webSocket, { request }) => {
        const req = await new Promise(resolve => {
          sessionHandler(request as any, {} as any, () => {
            // Directives are ignored in WS; need to auth explicitly
            ensureSignedIn(request as any)

            resolve(request)
          })
        })

        return { req }
      }
    },
    ...APOLLO_OPTIONS
  })

  server.applyMiddleware({ app, cors: false })

  return { app, server }
}

export default createApp
