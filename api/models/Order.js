const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const OrderItemSchema = require('./OrderItem')
const AddressSchema = require('./Address')

const OrderSchema = mongoose.Schema(
  {
    code: {
      type: Number,
      required: true
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    address: AddressSchema,
    name: {
      type: String,
      required: true
    },
    organization: String,
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    cpf_cnpj: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: 'pending'
    },
    items: [OrderItemSchema]
  },
  {
    timestamps: true
  }
)

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)
module.exports = Order
