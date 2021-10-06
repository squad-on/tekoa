const mongoose = require('mongoose')
const MessageSchema = require('./Message')
const ObjectId = mongoose.Schema.Types.ObjectId

const ConversationSchema = new mongoose.Schema({
  users: [{
    type: ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [MessageSchema]
}, {
  timestamps: true
})

const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema)
module.exports = Conversation
