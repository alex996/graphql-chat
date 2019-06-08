import { Document } from 'mongoose'
import { UserDocument, ChatDocument } from './'

export interface MessageDocument extends Document {
  body: string
  sender: UserDocument['_id']
  chat: ChatDocument['_id']
}
