import { Document, Types } from 'mongoose'

export interface MessageDocument extends Document {
  body: string;
  sender: Types.ObjectId;
  chat: Types.ObjectId;
}
