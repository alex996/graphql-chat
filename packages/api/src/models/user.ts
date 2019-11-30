/* eslint-disable @typescript-eslint/no-use-before-define */
import { model, Schema } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { UserDocument, UserModel } from '../types'

const userSchema = new Schema(
  {
    username: {
      type: String,
      validate: [
        async (username: string): Promise<boolean> =>
          !(await User.exists({ username })),
        'Username is already taken.'
      ]
    },
    email: {
      type: String,
      validate: [
        async (email: string): Promise<boolean> =>
          !(await User.exists({ email })),
        'Email is already taken.'
      ]
    },
    name: String,
    password: String,
    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
      }
    ]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function(this: UserDocument) {
  if (this.isModified('password')) {
    this.password = await User.hash(this.password)
  }
})

userSchema.statics.hash = (password: string): Promise<string> =>
  hash(password, 10)

userSchema.methods.matchesPassword = function(
  this: UserDocument,
  password: string
): Promise<boolean> {
  return compare(password, this.password)
}

const User = model<UserDocument, UserModel>('User', userSchema)

export default User
