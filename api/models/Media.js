const mongoose = require('mongoose')

const MediaSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: String,
  tags: [String],
  picture: Object,
  documents: [Object],
  url: String,
  oembed: String,
  publishing_date: Date,
  publishing_date_format: {
    type: String,
    default: 'DD/MM/YYYY'
  },
  publishing_house: String
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

const Media = mongoose.models.Media || mongoose.model('Media', MediaSchema)
module.exports = Media
