import { Document, Types } from 'mongoose'

export interface ChatDocument extends Document {
  title: string;
  users: [Types.ObjectId];
  lastMessage: Types.ObjectId;
}
