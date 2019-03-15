import Joi from 'joi'
import { signUp, signIn, objectId } from '../schemas'
import { attemptSignIn, signOut } from '../auth'
import { User } from '../models'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection
      return User.findById(req.session.userId)
    },
    users: (root, args, context, info) => {
      // TODO: projection, pagination
      return User.find({})
    },
    user: async (root, args, context, info) => {
      // TODO: projection
      await Joi.validate(args, objectId)
      return User.findById(args.id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: projection
      await Joi.validate(args, signUp, { abortEarly: false })

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      // TODO: projection
      await Joi.validate(args, signIn, { abortEarly: false })

      const user = await attemptSignIn(args.email, args.password)

      req.session.userId = user.id

      return user
    },
    signOut: (root, args, { req, res }, info) => {
      return signOut(req, res)
    }
  },
  User: {
    chats: async (user, args, { req }, info) => {
      // TODO: should not be able to list other ppl's chats or read their msgs!
      return (await user.populate('chats').execPopulate()).chats
    }
  }
}
