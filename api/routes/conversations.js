const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../config/auth')
const Conversation = mongoose.model('Conversation')

router.get('/connected_users', auth.authenticated, function(req, res) {
  const filters = {
    users: req.user._id
  }
  Conversation.find(filters).populate({
    path: 'users',
    select: 'name picture need offer',
    match: { _id: { $ne: req.user._id } }
  }).exec(function(err, conversations) {
    if (err) {
      res.status(422).send(err.response.data)
    } else {
      res.json(conversations.map(conversation => {
        return conversation.users.find(user => typeof user === 'object' && user._id !== req.user._id).publicData()
      }))
    }
  })
})

router.get('/unread', auth.authenticated, function(req, res) {
  const filters = {
    users: req.user._id
  }
  Conversation.find(filters).exec(function(err, conversations) {
    if (err) {
      res.status(422).send(err.response.data)
    } else {
      res.json(conversations.filter(conversation => {
        return conversation.messages.find(message => message.user !== req.user._id && !message.read)
      }).length)
    }
  })
})

router.get('/', auth.authenticated, function(req, res) {
  const filters = {
    users: { $inc: req.user._id }
  }
  Conversation.find(filters).populate({
    path: 'users',
    select: 'name picture need offer',
    match: { _id: { $ne: req.user._id } }
  }).exec(function(err, conversations) {
    if (err) {
      res.status(422).send(err.response.data)
    } else {
      res.json(conversations)
    }
  })
})

router.get('/:id', auth.authenticated, function(req, res) {
  const filters = {
    users: { $all: [req.user._id, req.params.id] }
  }
  Conversation.findOne(filters).populate({
    path: 'users',
    select: 'name picture need offer',
    match: { _id: { $ne: req.user._id } }
  }).exec(function(err, conversation) {
    if (err) {
      res.status(422).send(err.response.data)
    } else {
      res.json(conversation)
    }
  })
})

router.put('/:id', auth.authenticated, function(req, res) {
  const filters = {
    users: { $all: [req.user._id, req.params.id] }
  }
  Conversation.findOne(filters).populate({
    path: 'users',
    select: 'name picture need offer',
    match: { _id: { $ne: req.user._id } }
  }).exec(async function(err, conversation) {
    if (err) {
      res.status(422).send(err.response.data)
    } else {
      if (!conversation) {
        conversation = new Conversation({
          users: [req.user._id, req.params.id],
          messages: []
        })
      }
      if (req.body.message) {
        const message = { user: req.user._id, message: req.body.message }
        if (conversation.messages) {
          conversation.messages.push(message)
        } else {
          conversation.messages = [message]
        }
      }
      await conversation.save()
      res.json(conversation)
    }
  })
})

router.put('/:id/mark_as_read', auth.authenticated, function(req, res) {
  const filters = {
    users: req.user._id,
    _id: req.params.id
  }
  Conversation.findOne(filters).exec(async function(err, conversation) {
    if (err) {
      res.status(422).send(err.response.data)
    } else {
      conversation.messages = conversation.messages.map(message => {
        if (message.user !== req.user._id) {
          message.read = true
        }
        return message
      })
      await conversation.save()
      res.json(conversation)
    }
  })
})

module.exports = router
