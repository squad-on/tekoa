require('./database')

const express = require('express')
const app = express()
const router = require('express').Router()
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const categories = require('../data/categories.json')

const User = mongoose.model('User')
const Media = mongoose.model('Media')
const Conversation = mongoose.model('Conversation')
const Settings = mongoose.model('Settings')
const auth = require('./config/auth')

const secret = process.env.SECRET || process.env.APP_NAME

app.use(cors())
app.use(session({ secret, cookie: { maxAge: null }, resave: false, saveUninitialized: false }))
app.use(express.urlencoded({ extended: false, limit: '100mb' }))
app.use(express.json({ limit: '100mb' }))

// eslint-disable-next-line
app.use('/uploads', express.static(__dirname + '/uploads'))

router.use('/auth', require('./routes/auth'))
router.use('/uploads', require('./routes/uploads'))
router.use('/users', require('./routes/users'))
router.use('/settings', require('./routes/settings'))
router.use('/posts', require('./routes/posts'))
router.use('/pages', require('./routes/pages'))
router.use('/contacts', require('./routes/contacts'))
router.use('/medias', require('./routes/medias'))
router.use('/menus', require('./routes/menus'))
router.use('/conversations', require('./routes/conversations'))

router.get('/profile', auth.authenticated, function(req, res) {
  User.findById(req.user._id).exec(function(err, user) {
    if (!err && user) {
      res.send(user.data())
    } else {
      res.status(422).send('Usuário não encontrado')
    }
  })
})

router.get('/metrics', async function(req, res) {
  const userCount = await User.count()
  const mediasCount = await Media.count()
  const conversationsCount = await Conversation.count()

  res.send({ categories: categories.length, users: userCount, medias: mediasCount, conversations: conversationsCount })
})

router.get('/settings', async (req, res) => {
  const settings = await Settings.findOne({})
  res.send(settings)
})

app.use(router)

module.exports = {
  path: '/api',
  handler: app
}
