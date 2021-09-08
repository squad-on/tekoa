const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../config/auth')
const User = mongoose.model('User')

const setData = (user, data) => {
  user.email = data.email
  user.name = data.name
  user.picture = data.picture
  user.organization = data.organization
  user.addresses = data.addresses
  user.phone = data.phone
  user.cpf_cnpj = data.cpf_cnpj
}

router.get('/', auth.admin, function(req, res) {
  let filters = {}

  if (req.query.role) {
    filters = {
      role: req.query.role
    }
  }

  User.find(filters).exec(function(err, users) {
    if (err) {
      res.status(422).send(err.response.data)
    } else {
      res.json(users.map(user => user.data()))
    }
  })
})

router.get('/:id', auth.admin, function(req, res) {
  User.findById(req.params.id).then(function(user) {
    return res.send(user.data())
  })
})

router.post('/', auth.admin, (req, res, next) => {
  const user = new User()

  setData(user, req.body)

  user.role = req.body.role

  user.setPassword(req.body.password)

  user.save().then(function() {
    return res.send(user.data())
  }).catch(next)
})

router.post('/register', (req, res, next) => {
  const user = new User()

  setData(user, req.body)

  user.role = 'user'

  user.setPassword(req.body.password)

  user.save().then(function() {
    return res.send(user.data())
  }).catch(next)
})

router.put('/:id', auth.admin, function(req, res, next) {
  User.findById(req.params.id).then((user) => {
    setData(user, req.body)

    user.role = req.body.role

    if (req.body.password) {
      user.setPassword(req.body.password)
    }

    user.save().then(function() {
      return res.send(user.data())
    }).catch(next)
  })
})

router.put('/', auth.authenticated, function(req, res, next) {
  User.findById(req.user._id).then(function(user) {
    setData(user, req.body)
    if (req.body.password) {
      user.setPassword(req.body.password)
    }
    user.save().then(function() {
      return res.send(user.data())
    }).catch(next)
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  User.findOne({
    _id: req.params.id
  }).exec((err, user) => {
    if (err) {
      res.status(422).send(err.message)
    } else if (req.params.id === req.user._id) {
      res.status(422).send('Você não pode excuír você mesmo')
    } else {
      user.remove()
      res.send(user)
    }
  })
})

module.exports = router
