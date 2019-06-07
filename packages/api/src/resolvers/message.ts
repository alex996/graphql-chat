import Joi from '@hapi/joi'
import { Types } from 'mongoose'
import { UserInputError, ForbiddenError } from 'apollo-server-express'
import { Request, MessageDocument, UserDocument } from '../types'
import { sendMessage } from '../validators'
import { Chat, Message } from '../models'
import { fields } from '../utils'

export default {
  Mutation: {
    sendMessage: async (
      root: any,
      args: { chatId: string; body: string },
      { req }: { req: Request }
    ): Promise<MessageDocument> => {
      await Joi.validate(args, sendMessage, { abortEarly: false })

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

      chat.lastMessage = message
      await chat.save()

      return message
    }
  },
  Message: {
    sender: async (
      message: MessageDocument,
      args: any,
      ctx: any,
      info: any
    ): Promise<UserDocument> => {
      return (await message.populate('sender', fields(info)).execPopulate())
        .sender
    }
  }
}
