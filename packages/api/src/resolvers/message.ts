import { MessageDocument } from '../types'
import { fields } from '../utils'

export default {
  Message: {
    sender: async (
      message: MessageDocument,
      args: any,
      ctx: any,
      info: any
    ) => {
      return (await message.populate('sender', fields(info)).execPopulate())
        .sender
    }
  }
}
