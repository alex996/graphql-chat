import { Document } from 'mongoose'
import { UserDocument, MessageDocument } from './'

export interface ChatDocument extends Document {
  title: string
  users: [UserDocument['_id']]
  lastMessage: MessageDocument['_id']
}
