const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  content: String,
  picture: Object,
  documents: [Object],
  tags: [String],
  start_at: Date,
  end_at: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

EventSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema)
module.exports = Event
