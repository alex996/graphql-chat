import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { signUp, signIn } from '../schemas'
import { User } from '../models'
import * as Auth from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection
      Auth.checkSignedIn(req)

      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      // TODO: auth, projection, pagination

      Auth.checkSignedIn(req)

      return User.find({})
    },
    user: (root, { id }, { req }, info) => {
      // TODO: auth, projection, sanitization

      Auth.checkSignedIn(req)

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: not auth, validation

      Auth.checkSignedOut(req)

      await Joi.validate(args, signUp, { abortEarly: false })

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session

      if (userId) {
        return User.findById(userId)
      }

      await Joi.validate(args, signIn, { abortEarly: false })

      const user = await Auth.attemptSignIn(args.email, args.password)

      req.session.userId = user.id

      return user
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req)

      return Auth.signOut(req, res)
    }
  }
}
