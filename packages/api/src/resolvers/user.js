import { User } from '../models'

export default {
  Query: {
    users: (root, args, ctx, info) => {
      return User.find({}).select('-__v')
    }
  }
}
