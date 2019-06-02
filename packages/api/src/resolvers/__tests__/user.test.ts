import mockingoose from 'mockingoose'
import { User } from '../../models'

const user = {
  _id: '507f191e810c19729de860ea',
  name: 'Alex',
  username: 'alex',
  email: 'alex@gmail.com',
  password: 'Secret12' // TODO: faker / fixtures
}

const { _id: id, name, username, email, password } = user

describe('authentication', () => {
  describe('sign-up', () => {
    it('should return a new user and set a cookie', async () => {
      mockingoose(User).toReturn(0, 'countDocuments')
      mockingoose(User).toReturn(user, 'save')

      const res = await global.graphql().send({
        query: `
            mutation {
              signUp(
                name: "${name}",
                username: "${username}",
                email: "${email}",
                password: "${password}"
              ) {
                id
                email
              }
            }
          `
      })

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { signUp: { id, email } } })
      expect(res.header['set-cookie'][0]).toContain('sid=s%3A')
    })
  })

  describe('sign-in', () => {
    it('should return an existing user and set a cookie', async () => {
      const res = await global.signIn(user)

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { signIn: { id, email } } })
      expect(res.header['set-cookie'][0]).toContain('sid=s%3A')
    })
  })

  describe('sign-out', () => {
    it('should return true and clear the cookie', async () => {
      const cookie = (await global.signIn(user)).header['set-cookie'][0]

      const res = await global
        .graphql()
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

describe('queries', () => {
  describe('me', () => {
    it('should return the signed-in user', async () => {
      const cookie = (await global.signIn(user)).header['set-cookie'][0]

      const res = await global
        .graphql()
        .set('Cookie', cookie)
        .send({
          query: `
            {
              me {
                id
                name
                email
              }
            }
        `
        })

      expect(res.status).toBe(200)
      expect(res.body).toEqual({
        data: { me: { id, name, email } }
      })
    })
  })
})
