/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User, Chat } from '../../models'
import { alex, max, users } from '../__fixtures__'

const { name, username, email, password } = alex

afterEach(async () => {
  await User.deleteMany({})
})

describe('Mutation', () => {
  describe('signUp', () => {
    it('should return a new user and set a cookie', async () => {
      // When
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
            }
          }
        `
      })

      // Then
      const user = await User.findOne({ email }).select('_id')

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { signUp: { id: user!.id } } })
      expect(res.header['set-cookie'][0]).toContain('sid=s%3A')
    })
  })

  describe('signIn', () => {
    it('should return an existing user and set a cookie', async () => {
      // Given
      const { id } = await User.create(alex)

      // When
      const res = await global.signIn(email, password)

      // Then
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { signIn: { id } } })
      expect(res.header['set-cookie'][0]).toContain('sid=s%3A')
    })
  })

  describe('signOut', () => {
    it('should return true and clear the cookie', async () => {
      // Given
      await User.create(alex)
      const {
        header: {
          'set-cookie': [cookie]
        }
      } = await global.signIn(email, password)

      // When
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

      // Then
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { signOut: true } })
      expect(res.header['set-cookie'][0]).toContain('sid=;')
    })
  })
})

describe('Query', () => {
  let id: string, cookie: string

  beforeEach(async () => {
    ;({ id } = await User.create(alex))
    ;({
      header: {
        'set-cookie': [cookie]
      }
    } = await global.signIn(email, password))
  })

  describe('me', () => {
    it('should return the signed-in user', async () => {
      // When
      const res = await global
        .graphql()
        .set('Cookie', cookie)
        .send({
          query: `
            {
              me {
                id
                email
                username
              }
            }
          `
        })

      // Then
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { me: { id, email, username } } })
    })
  })

  describe('user', () => {
    it('should return the user with a given id', async () => {
      // Given
      const { id, username, email } = await User.create(max)

      // When
      const res = await global
        .graphql()
        .set('Cookie', cookie)
        .send({
          query: `
            {
              user(id: "${id}") {
                id
                email
                username
              }
            }
          `
        })

      // Then
      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { user: { id, email, username } } })
    })
  })

  describe('users', () => {
    it('should return existing users', async () => {
      // Given
      const docs = await User.insertMany(users)

      // When
      const res = await global
        .graphql()
        .set('Cookie', cookie)
        .send({
          query: `
            {
              users {
                id
                email
                username
              }
            }
          `
        })

      // Then
      const results = [
        { id, email, username },
        ...docs.map(({ id, email, username }) => ({
          id,
          email,
          username
        }))
      ]

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { users: results } })
    })
  })
})

describe('User', () => {
  describe('chats', () => {
    it('should return user chats', async () => {
      // Given
      const [a, { id: m }] = await Promise.all([
        User.create(alex),
        User.create(max)
      ])
      const { id } = await Chat.create({ users: [a.id, m] })
      await a.updateOne({ $push: { chats: id } })

      const {
        header: {
          'set-cookie': [cookie]
        }
      } = await global.signIn(email, password)

      // When
      const res = await global
        .graphql()
        .set('Cookie', cookie)
        .send({
          query: `
            {
              me {
                chats {
                  id
                  title
                }
              }
            }
          `
        })

      // Then
      expect(res.status).toBe(200)
      expect(res.body).toEqual({
        data: { me: { chats: [{ id, title: `${name}, ${max.name}` }] } }
      })
    })
  })
})
