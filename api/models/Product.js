const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
  deleted: Boolean,
  published: Boolean,
  slug: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  qtd: {
    type: Number,
    required: true
  },
  tags: [String],
  pictures: [Object],
  documents: [Object],

  // shipping
  weight: Number,
  format: Number,
  length: Number,
  height: Number,
  width: Number,
  diameter: Number,
  shipping_services: [String]

}, {
  timestamps: true
})

ProductSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'items.product',
  options: { match: { deleted: { $ne: true } } }
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
module.exports = Product
