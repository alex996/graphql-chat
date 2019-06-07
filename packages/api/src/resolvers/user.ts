import Joi from '@hapi/joi'
import { Request, Response, UserDocument, ChatDocument } from '../types'
import { signUp, signIn, objectId } from '../validators'
import { attemptSignIn, signOut } from '../auth'
import { User } from '../models'
import { fields } from '../utils'

export default {
  Query: {
    me: (
      root: any,
      args: any,
      { req }: { req: Request },
      info: any
    ): Promise<UserDocument | null> => {
      return User.findById(req.session.userId, fields(info)).exec()
    },
    users: (
      root: any,
      args: any,
      ctx: any,
      info: any
    ): Promise<UserDocument[]> => {
      // TODO: pagination
      return User.find({}, fields(info)).exec()
    },
    user: async (
      root: any,
      args: { id: string },
      ctx: any,
      info: any
    ): Promise<UserDocument | null> => {
      await Joi.validate(args, objectId)

      return User.findById(args.id, fields(info))
    }
  },
  Mutation: {
    signUp: async (
      root: any,
      args: { email: string; username: string; name: string; password: string },
      { req }: { req: Request }
    ): Promise<UserDocument> => {
      await Joi.validate(args, signUp, { abortEarly: false })

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (
      root: any,
      args: { email: string; password: string },
      { req }: { req: Request }
    ): Promise<UserDocument> => {
      await Joi.validate(args, signIn, { abortEarly: false })

      const user = await attemptSignIn(args.email, args.password)

      req.session.userId = user.id

      return user
    },
    signOut: (
      root: any,
      args: any,
      { req, res }: { req: Request; res: Response }
    ): Promise<boolean> => {
      return signOut(req, res)
    }
  },
  User: {
    chats: async (
      user: UserDocument,
      args: any,
      { req }: { req: Request },
      info: any
    ): Promise<ChatDocument[]> => {
      // TODO: paginate
      return (await user
        .populate({
          path: 'chats',
          match: {
            users: {
              $in: req.session.userId
            }
          },
          select: fields(info)
        })
        .execPopulate()).chats
    }
  }
}
