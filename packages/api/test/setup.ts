import request, { Test } from 'supertest'
import mockingoose from 'mockingoose'
import { User } from '../src/models'
import createApp from '../src/app'

const { app, server } = createApp()

const req = request(app)

global.graphql = (): Test => req.post(server.graphqlPath)

// prettier-ignore
global.signIn = async (user: { id: string; password: string; email: string }): Promise<Test> => {
  const { password, email } = user

  mockingoose(User).toReturn(
    {
      ...user,
      password: await User.hash(password)
    },
    'findOne'
  )

  return global.graphql().send({
    query: `
        mutation {
          signIn(
            email: "${email}",
            password: "${password}"
          ) {
            id
            email
          }
        }
      `
  })
}
