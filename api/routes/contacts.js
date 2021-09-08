const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Contact = mongoose.model('Contact')

router.get('/', auth.admin, (req, res) => {
  const query = {}
  Contact.find(query).sort('name').exec((err, contacts) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(contacts)
    }
  })
})

router.post('/contact', (req, res) => {
  const contact = new Contact()

  contact.name = req.body.name
  contact.email = req.body.email
  contact.message = req.body.message

  contact.save().then(() => {
    res.json(contact)
  }).catch(err => {
    res.status(422).send(err.message)
  })
})

module.exports = router
