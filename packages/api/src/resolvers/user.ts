import Joi from '@hapi/joi'
import { signUp, signIn, objectId } from '../validators'
import { attemptSignIn, signOut } from '../auth'
import { User } from '../models'
import { Request, Response, UserDocument, ChatDocument } from '../types'

export default {
  Query: {
    me: (
      root: any,
      args: any,
      { req }: { req: Request }
    ): Promise<UserDocument | null> => {
      // TODO: projection
      return User.findById(req.session.userId).exec()
    },
    users: (): Promise<UserDocument[]> => {
      // TODO: projection, pagination
      return User.find({}).exec()
    },
    user: async (
      root: any,
      args: { id: string }
    ): Promise<UserDocument | null> => {
      // TODO: projection
      await Joi.validate(args, objectId)
      return User.findById(args.id)
    }
  },
  Mutation: {
    signUp: async (
      root: any,
      args: { email: string; username: string; name: string; password: string },
      { req }: { req: Request }
    ): Promise<UserDocument> => {
      // TODO: projection
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
      // TODO: projection
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
    chats: async (user: UserDocument): Promise<ChatDocument[]> => {
      // TODO: should not be able to list other ppl's chats or read their msgs!
      return (await user.populate('chats').execPopulate()).chats
    }
  }
}
