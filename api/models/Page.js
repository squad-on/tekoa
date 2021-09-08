const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const PageSchema = mongoose.Schema({
  slug: {
    type: String,
    required: true,
    index: true
  },
  tags: [String],
  documents: [Object],
  title: String,
  description: String,
  content: String,
  pictures: [Object]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

PageSchema.index({ slug: 1 }, { unique: true })

PageSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema)
module.exports = Page
