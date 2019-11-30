import { IResolvers } from 'apollo-server-express'
import { Request, Response, UserDocument, ChatDocument } from '../types'
import { signUp, signIn, objectId } from '../validators'
import { attemptSignIn, signOut } from '../auth'
import { User } from '../models'
import { fields } from '../utils'

const resolvers: IResolvers = {
  Query: {
    me: (
      root,
      args,
      { req }: { req: Request },
      info
    ): Promise<UserDocument | null> => {
      return User.findById(req.session.userId, fields(info)).exec()
    },
    users: (root, args, ctx, info): Promise<UserDocument[]> => {
      // TODO: pagination
      return User.find({}, fields(info)).exec()
    },
    user: async (
      root,
      args: { id: string },
      ctx,
      info
    ): Promise<UserDocument | null> => {
      await objectId.validateAsync(args)

      return User.findById(args.id, fields(info))
    }
  },
  Mutation: {
    signUp: async (
      root,
      args: { email: string; username: string; name: string; password: string },
      { req }: { req: Request }
    ): Promise<UserDocument> => {
      await signUp.validateAsync(args, { abortEarly: false })

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (
      root,
      args: { email: string; password: string },
      { req }: { req: Request },
      info
    ): Promise<UserDocument> => {
      await signIn.validateAsync(args, { abortEarly: false })

      const user = await attemptSignIn(args, fields(info))

      req.session.userId = user.id

      return user
    },
    signOut: (
      root,
      args,
      { req, res }: { req: Request; res: Response }
    ): Promise<boolean> => {
      return signOut(req, res)
    }
  },
  User: {
    chats: async (
      user: UserDocument,
      args,
      { req }: { req: Request },
      info
    ): Promise<ChatDocument[]> => {
      if (user.id !== req.session.userId) {
        return []
      }

      await user
        .populate({
          // TODO: paginate
          path: 'chats',
          select: fields(info)
        })
        .execPopulate()
      return user.chats
    }
  }
}

export default resolvers
