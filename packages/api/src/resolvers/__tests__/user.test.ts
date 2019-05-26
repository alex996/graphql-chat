import mockingoose from 'mockingoose'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { User } from '../../models'
import createApp from '../../app'

// TODO: move to setupFiles
const { app, server } = createApp()

const req = request(app)

const graphql = () => req.post(server.graphqlPath)

describe('authentication', () => {
  const user = {
    name: 'Alex',
    username: 'alex',
    email: 'alex@gmail.com',
    password: 'Secret12' // TODO: faker / fixtures
  }

  const { name, username, email, password } = user

  describe('sign-up', () => {
    it('should return a new user and set a cookie', async () => {
      mockingoose(User).toReturn(0, 'countDocuments')
      mockingoose(User).toReturn(user, 'save')

      // TODO: extract into helper
      const res = await graphql().send({
        query: `
            mutation {
              signUp(
                name: "${name}",
                username: "${username}",
                email: "${email}",
                password: "${password}"
              ) {
                email
              }
            }
          `
      })

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { signUp: { email } } })
      expect(res.header['set-cookie'][0]).toContain('sid=s%3A')
    })
  })

  describe('sign-in', () => {
    it('should return an existing user and set a cookie', async () => {
      mockingoose(User).toReturn(
        {
          ...user,
          password: await hash(password, 10)
        },
        'findOne'
      )

      const res = await graphql().send({
        query: `
            mutation {
              signIn(
                email: "${email}",
                password: "${password}"
              ) {
                email
              }
            }
          `
      })

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { signIn: { email } } })
      expect(res.header['set-cookie'][0]).toContain('sid=s%3A')
    })
  })

  describe('sign-out', () => {
    it('should return true and clear the cookie', async () => {
      mockingoose(User).toReturn(
        {
          ...user,
          password: await hash(password, 10) // TODO: move to model
        },
        'findOne'
      )

      const signIn = await graphql().send({
        query: `
            mutation {
              signIn(
                email: "${email}",
                password: "${password}"
              ) {
                email
              }
            }
          `
      })

      const cookie = signIn.header['set-cookie'][0]

      const res = await graphql()
        .set('Cookie', cookie)
        .send({
          query: `
            mutation {
              signOut
            }
          `
        })

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { signOut: true } })
      expect(res.header['set-cookie'][0]).toContain('sid=;')
    })
  })
})
