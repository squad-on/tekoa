const crypto = require('crypto')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')

mongoose.set('useCreateIndex', true)
const secret = process.env.SECRET || process.env.APP_NAME

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'inválido']
  },
  role: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  organization: String,
  picture: Object,
  phone: String,
  cpf_cnpj: String
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

UserSchema.plugin(uniqueValidator, {
  message: 'Este nome já está sendo usado'
})

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.data = function() {
  return {
    _id: this._id,
    email: this.email,
    role: this.role,
    name: this.name,
    picture: this.picture,
    organization: this.organization,
    phone: this.phone,
    cpf_cnpj: this.cpf_cnpj
  }
}

UserSchema.methods.generateJWT = function () {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign(
    {
      ...this.data(),
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  )
}

UserSchema.methods.toAuthJSON = function () {
  return {
    ...this.data(),
    token: this.generateJWT()
  }
}

const User = mongoose.models.User || mongoose.model('User', UserSchema)
module.exports = User
