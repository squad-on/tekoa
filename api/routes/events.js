const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Event = mongoose.model('Event')

router.get('/', (req, res) => {
  Event.find({}).populate(req.query.populate).sort({ start_at: -1 }).exec((err, events) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(events)
    }
  })
})

router.get('/current_tags', (req, res) => {
  Event.find().select('tags').exec((err, medias) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      const tags = {}
      medias.forEach(media => {
        if (media.tags) {
          media.tags.forEach(tag => {
            tags[tag] = true
          })
        }
      })
      res.json(Object.keys(tags).sort((a, b) => a.localeCompare(b)))
    }
  })
})

router.get('/:id', (req, res) => {
  Event.findOne({
    _id: req.params.id
  }).exec((err, event) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(event)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newEvent = new Event(req.body)
  newEvent.save((err, event) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(event)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  Event.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, event) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(event)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Event.findOne({
    _id: req.params.id
  }).exec((err, event) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      event.remove()
      res.send(event)
    }
  })
})

module.exports = router
