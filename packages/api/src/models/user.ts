/* eslint-disable @typescript-eslint/no-use-before-define */
import { model, Schema, DocumentQuery } from 'mongoose'
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
        // @ts-ignore
        (username: string): boolean => User.where('username', username).none(),
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
        // @ts-ignore
        (email: string): boolean => User.where('email', email).none(),
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

userSchema.pre('save', async function (this: UserDocument) {
  if (this.isModified('password')) {
    this.password = await User.hash(this.password)
  }
})

userSchema.query.none = async function (
  this: DocumentQuery<any, UserDocument>
): Promise<boolean> {
  return (await this.countDocuments()) === 0
}

userSchema.statics.hash = (password: string): Promise<string> =>
  hash(password, 10)

userSchema.methods.matchesPassword = function (
  this: UserDocument,
  password: string
): Promise<boolean> {
  return compare(password, this.password)
}

const User = model<UserDocument, UserModel>('User', userSchema)

export default User
