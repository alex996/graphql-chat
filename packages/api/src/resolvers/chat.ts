import {
  IResolvers,
  UserInputError,
  ForbiddenError
} from 'apollo-server-express'
import { startChat, inviteUsers } from '../validators'
import { User, Chat, Message } from '../models'
import { Request, ChatDocument, UserDocument, MessageDocument } from '../types'
import { fields } from '../utils'

const resolvers: IResolvers = {
  Mutation: {
    startChat: async (
      root,
      args: { title: string; userIds: [string] },
      { req }: { req: Request }
    ): Promise<ChatDocument> => {
      const { userId } = req.session
      const { title, userIds } = args

      await startChat(userId).validateAsync(args, { abortEarly: false })

      userIds.push(userId)

      const chat = await Chat.create({ title, users: userIds })

      await User.updateMany(
        { _id: { $in: userIds } },
        {
          $push: { chats: chat }
        }
      )

      return chat
    },
    inviteUsers: async (
      root,
      args: { chatId: string; userIds: [string] },
      { req }: { req: Request }
    ) => {
      const { userId } = req.session
      const { chatId, userIds } = args

      await inviteUsers(userId).validateAsync(args, { abortEarly: false })

      const chat = await Chat.findById(chatId)

      if (!chat) {
        throw new UserInputError('Chat was not found')
      }

      if (!chat.users.includes(userId)) {
        throw new ForbiddenError(
          'You are not a member of this chat. Please ask for an invite.'
        )
      }

      const idsFound = await User.where('_id')
        .in(userIds)
        .countDocuments()

      if (idsFound !== userIds.length) {
        throw new UserInputError('One or more User IDs are invalid.')
      }

      console.log(chat.users, chat.users.includes(userId), userId)

      return
    }
  },
  Chat: {
    messages: (
      chat: ChatDocument,
      args,
      ctx,
      info
    ): Promise<MessageDocument[]> => {
      // TODO: pagination
      return Message.find({ chat: chat.id }, fields(info)).exec()
    },
    users: async (
      chat: ChatDocument,
      args,
      ctx,
      info
    ): Promise<UserDocument[]> => {
      return (await chat.populate('users', fields(info)).execPopulate()).users
    },
    lastMessage: async (
      chat: ChatDocument,
      args,
      ctx,
      info
    ): Promise<MessageDocument> => {
      return (await chat.populate('lastMessage', fields(info)).execPopulate())
        .lastMessage
    }
  }
}

export default resolvers
