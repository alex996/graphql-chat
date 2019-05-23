import { Document, Model } from 'mongoose'
import { ChatDocument } from './chat'

export interface UserDocument extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  chats: [ChatDocument];
  matchesPassword: (password: string) => boolean;
}

export interface UserModel extends Model<UserDocument> {
  doesntExist: (options: object) => boolean;
}
