/* eslint-disable @typescript-eslint/no-use-before-define */
import { model, Schema } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { UserDocument, UserModel } from '../types'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
      validate: [
        (username: string): boolean => User.doesntExist({ username }),
        'Username is already taken.'
      ]
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      minlength: 8,
      maxlength: 254,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Email is invalid.'],
      validate: [
        (email: string): boolean => User.doesntExist({ email }),
        'Email is already taken.'
      ]
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
      match: [
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        'Password must contain one lowercase letter, one uppercase letter, and one number.'
      ]
    },
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

userSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    this.password = await User.hash(this.password)
  }
})

userSchema.statics.doesntExist = async function (
  options: object
): Promise<boolean> {
  return (await this.where(options).countDocuments()) === 0
}

userSchema.statics.hash = (password: string): Promise<string> =>
  hash(password, 10)

userSchema.methods.matchesPassword = function (
  password: string
): Promise<boolean> {
  return compare(password, this.password)
}

const User = model<UserDocument, UserModel>('User', userSchema)

export default User
