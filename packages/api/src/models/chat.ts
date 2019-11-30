/* eslint-disable @typescript-eslint/no-use-before-define */
import { model, Schema } from 'mongoose'
import { ChatDocument } from '../types'
import { User } from './'

const { ObjectId } = Schema.Types

const chatSchema = new Schema(
  {
    title: String,
    users: {
      type: [
        {
          type: ObjectId,
          ref: 'User'
        }
      ],
      validate: [
        {
          // TODO: both run in parallel, make sequential
          validator: async (userIds: string[]): Promise<boolean> =>
            (await User.where('_id')
              .in(userIds)
              .countDocuments()) === userIds.length,
          message: 'One or more User IDs are invalid.'
        },
        {
          validator: async (userIds: string[]): Promise<boolean> =>
            !(await Chat.exists({ users: userIds })),
          message: 'Chat with given User IDs already exists.'
        }
      ]
    },
    lastMessage: {
      type: ObjectId,
      ref: 'Message'
    }
  },
  {
    timestamps: true
  }
)

const Chat = model<ChatDocument>('Chat', chatSchema)

export default Chat
