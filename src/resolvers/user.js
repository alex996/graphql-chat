import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import * as Schemas from '../schemas'
import * as Auth from '../auth'
import { User } from '../models'

export default {
  Query: {
    me: Auth.ensureSignedIn(
      (root, args, { req }, info) => {
        // TODO: projection
        return User.findById(req.session.userId)
      }
    ),
    users: Auth.ensureSignedIn(
      (root, args, { req }, info) => {
        // TODO: projection, pagination
        return User.find({})
      }
    ),
    user: Auth.ensureSignedIn(
      (root, { id }, { req }, info) => {
        // TODO: projection, sanitization
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new UserInputError(`${id} is not a valid user ID.`)
        }
        return User.findById(id)
      }
    )
  },
  Mutation: {
    signUp: Auth.ensureSignedOut(
      async (root, args, { req }, info) => {
        // TODO: projection
        await Joi.validate(args, Schemas.signUp, { abortEarly: false })

        const user = await User.create(args)

        await Auth.signIn()

        return user
      }
    ),
    signIn: async (root, args, { req }, info) => {
      const { user } = req

      if (user) {
        return user
      }

      await Joi.validate(args, Schemas.signIn, { abortEarly: false })

      return Auth.signInOrFail(req, args.email, args.password)
    },
    signOut: Auth.ensureSignedIn(
      (root, args, { req, res }, info) => {
        return Auth.signOut(req, res)
      }
    )
  }
}
