const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Settings = mongoose.model('Settings')
const User = mongoose.model('User')

router.get('/', (req, res) => {
  Settings.findOne().exec((err, settings) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(settings)
    }
  })
})

router.post('/', auth.admin, async (req, res) => {
  const settings = await Settings.findOne()
  Object.keys(req.body).forEach(key => {
    settings[key] = req.body[key]
  })
  settings.save((err, settings) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(settings)
    }
  })
})

router.post('/setup', async (req, res) => {
  let settings = await Settings.findOne()
  if (!settings) {
    settings = new Settings({ title: req.body.title })
    await settings.save()
    const admin = new User({
      name: req.body.admin_name,
      email: req.body.email,
      role: 'admin'
    })
    admin.setPassword(req.body.password)
    await admin.save()
    res.send({ settings, admin: admin.data() })
  }
})

module.exports = router
