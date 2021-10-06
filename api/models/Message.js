const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const MessageSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'Menu',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = MessageSchema
