const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
    required: true
  },
  qtd: Number,
  price: Number,
  total: Number
})

module.exports = OrderItemSchema
