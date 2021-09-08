const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
  postal_code: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  uf: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  number: String,
  neighborhood: String,
  complement: String,
  description: String,
  address: String,
  source: Object,
  location: {
    type: {
      type: String
    },
    coordinates: []
  }
})

AddressSchema.index({ location: '2dsphere' })

module.exports = AddressSchema
