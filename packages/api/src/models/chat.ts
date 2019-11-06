import mongoose, { Schema, DocumentQuery } from 'mongoose'
import { ChatDocument, UserDocument, ChatModel } from '../types'
import { User } from './'

const { ObjectId } = Schema.Types

const chatSchema = new Schema(
  {
    title: String,
    users: [
      {
        type: ObjectId,
        ref: 'User'
      }
    ],
    lastMessage: {
      type: ObjectId,
      ref: 'Message'
    }
  },
  {
    timestamps: true
  }
)

const USER_LIMIT = 5

chatSchema.pre('save', async function(this: ChatDocument) {
  if (!this.title) {
    const users = await User.where('_id')
      .in(this.users)
      .limit(USER_LIMIT)
      .select('name')

    // TODO: what if name changes? Also, exclude signed in user (virtual attr)?
    let title = users.map((u: UserDocument) => u.name).join(', ')

    if (this.users.length > USER_LIMIT) {
      title += '...'
    }

    this.title = title
  }
})

chatSchema.query.any = async function(
  this: DocumentQuery<any, ChatDocument>
): Promise<boolean> {
  return (await this.countDocuments()) !== 0
}

export default mongoose.model<ChatDocument, ChatModel>('Chat', chatSchema)
