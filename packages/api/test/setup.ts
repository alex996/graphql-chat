import request, { Test } from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import createApp from '../src/app'
import { DB_OPTIONS } from '../src/config'

const {
  app,
  server: { graphqlPath }
} = createApp()

const req = request(app)

global.graphql = (): Test => req.post(graphqlPath)

global.signIn = (email: string, password: string) =>
  global.graphql().send({
    query: `
          mutation {
            signIn(
              email: "${email}",
              password: "${password}"
            ) {
              id
            }
          }
        `
  })

let mongod: MongoMemoryServer

beforeAll(async () => {
  mongod = new MongoMemoryServer()

  const uri = await mongod.getConnectionString()

  await mongoose.connect(uri, DB_OPTIONS)
})

afterAll(async () => {
  await mongoose.disconnect()

  await mongod.stop()
})
