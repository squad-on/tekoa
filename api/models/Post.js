const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const PostSchema = mongoose.Schema({
  slug: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  content: String,
  picture: Object,
  documents: [Object],
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

PostSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)
module.exports = Post
