import { Types } from 'mongoose'
import {
  IResolvers,
  UserInputError,
  ForbiddenError,
  withFilter
} from 'apollo-server-express'
import { Request, MessageDocument, UserDocument } from '../types'
import { sendMessage } from '../validators'
import { Chat, Message } from '../models'
import { fields, hasSubfields } from '../utils'
import pubsub from '../pubsub'

const MESSAGE_SENT = 'MESSAGE_SENT'

const resolvers: IResolvers = {
  Mutation: {
    sendMessage: async (
      root,
      args: { chatId: string; body: string },
      { req }: { req: Request }
    ): Promise<MessageDocument> => {
      await sendMessage.validateAsync(args, { abortEarly: false })

      const { userId } = req.session
      const { chatId, body } = args

      const chat = await Chat.findById(chatId).select('users')

      if (!chat) {
        throw new UserInputError('Chat was not found.')
      } else if (!chat.users.some((id: Types.ObjectId) => id.equals(userId))) {
        throw new ForbiddenError(
          'Cannot join the chat. Please ask for an invite.'
        )
      }

      const message = await Message.create({
        body,
        sender: userId,
        chat: chatId
      })

      pubsub.publish(MESSAGE_SENT, { messageSent: message, users: chat.users })

      chat.lastMessage = message
      await chat.save()

      return message
    }
  },
  Subscription: {
    messageSent: {
      resolve: (
        { messageSent }: { messageSent: MessageDocument },
        args,
        ctx,
        info
      ) => {
        return hasSubfields(info)
          ? Message.findById(messageSent._id, fields(info))
          : messageSent
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_SENT),
        async (
          {
            messageSent,
            users
          }: { messageSent: MessageDocument; users: [string] },
          { chatId }: { chatId: string },
          { req }: { req: Request }
        ) => {
          return (
            messageSent.chat === chatId && users.includes(req.session.userId)
          )
        }
      )
    }
  },
  Message: {
    sender: async (
      message: MessageDocument,
      args,
      ctx,
      info
    ): Promise<UserDocument> => {
      return (await message.populate('sender', fields(info)).execPopulate())
        .sender
    }
  }
}

export default resolvers
