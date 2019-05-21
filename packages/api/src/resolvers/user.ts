import { User } from '../models'

export default {
  Query: {
    users: () => {
      return User.find({}).select('-__v')
    }
  }
}
