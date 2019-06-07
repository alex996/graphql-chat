import { Document, Model } from 'mongoose'
import { ChatDocument } from './chat'

export interface UserDocument extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  chats: [ChatDocument['_id']];
  matchesPassword: (password: string) => Promise<boolean>;
}

interface UserQueryHelpers {
  none: () => Promise<boolean>;
}

export interface UserModel extends Model<UserDocument, UserQueryHelpers> {
  hash: (password: string) => Promise<string>;
}
