import { Document, Model } from 'mongoose'
import { ChatDocument } from './'

export interface UserDocument extends Document {
  name: string
  email: string
  username: string
  password: string
  chats: [ChatDocument['_id']]
  matchesPassword: (password: string) => Promise<boolean>
}

export interface UserModel extends Model<UserDocument> {
  hash: (password: string) => Promise<string>
}
