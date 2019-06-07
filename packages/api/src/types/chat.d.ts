import { Document, Model } from 'mongoose'
import { UserDocument, MessageDocument } from './'

export interface ChatDocument extends Document {
  title: string;
  users: [UserDocument['_id']];
  lastMessage: MessageDocument['_id'];
}

interface ChatQueryHelpers {
  any: () => Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChatModel extends Model<ChatDocument, ChatQueryHelpers> {}
