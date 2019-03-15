import mongoose, { Schema } from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: 'Email has already been taken.'
    }
  },
  username: {
    type: String,
    validate: {
      validator: username => User.doesntExist({ username }),
      message: 'Username has already been taken.'
    }
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }],
  name: String,
  password: String
}, {
  timestamps: true
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
