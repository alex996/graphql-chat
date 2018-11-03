import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { SignUp } from '../schemas'
import { User } from '../models'

export default {
  Query: {
    users: (root, args, context, info) => {
      // TODO: auth, projection, pagination

      return User.find({})
    },
    user: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      // TODO: not auth, validation

      await Joi.validate(args, SignUp, { abortEarly: false })

      return User.create(args)
    }
  }
}
