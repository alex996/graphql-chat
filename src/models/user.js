const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = mongoose.model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatarUrl: String,
  chats: {
    type: [Schema.Types.ObjectId],
    ref: 'Chat'
  }
}, {
  timestamps: true
}))
