/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User, Chat, Message } from '../../models'
import { UserDocument } from '../../types'
import { alex, max } from '../__fixtures__'

const { name, email, password } = alex

let a: UserDocument, m: UserDocument, cookie: string

beforeEach(async () => {
  a = await User.create(alex)
  m = await User.create(max)
  ;({
    header: {
      'set-cookie': [cookie]
    }
  } = await global.signIn(email, password))
})

afterEach(async () => {
  await User.deleteMany({})
  await Chat.deleteMany({})
})

describe('Mutation', () => {
  describe('startChat', () => {
    it('should create a chat', async () => {
      // When
      const res = await global
        .graphql()
        .set('Cookie', cookie)
        .send({
          query: `
          mutation {
            startChat(userIds: ["${m.id}"]) {
              id
              title
            }
          }
        `
        })

      // Then
      const title = `${name}, ${m.name}`
      const chat = await Chat.findOne({ title }).select('_id')

      expect(res.status).toBe(200)
      expect(res.body).toEqual({ data: { startChat: { id: chat!.id, title } } })
    })
  })
})

describe('Chat', () => {
  describe('messages', () => {
    it('should return chat messages', async () => {
      // Given
      const chat = await Chat.create({
        users: [a.id, m.id]
      })
      await a.updateOne({ $push: { chats: chat } })
      const messages = await Message.insertMany([
        { body: 'Hi', sender: a, chat },
        { body: "What's up", sender: m, chat }
      ])

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
                  messages {
                    body
                  }
                }
              }
            }
          `
        })

      // Then
      const results = messages.map(m => ({ body: m.body }))
      expect(res.status).toBe(200)
      expect(res.body).toEqual({
        data: { me: { chats: [{ id: chat.id, messages: results }] } }
      })
    })
  })
})
