import mongoose, { Schema } from 'mongoose'
import { MessageDocument } from '../types'

const { ObjectId } = Schema.Types

const messageSchema = new Schema(
  {
    body: String,
    sender: {
      type: ObjectId,
      ref: 'User'
    },
    chat: {
      type: ObjectId,
      ref: 'Chat'
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<MessageDocument>('Message', messageSchema)
