const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const auth = require('../config/auth')
const Post = mongoose.model('Post')

router.get('/', (req, res) => {
  Post.find({}).populate(req.query.populate).sort({ createdAt: -1 }).exec((err, posts) => {
    console.log('asdfasdf', posts)
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(posts)
    }
  })
})

router.get('/current_tags', (req, res) => {
  Post.find().select('tags').exec((err, posts) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      const tags = {}
      posts.forEach(post => {
        if (post.tags) {
          post.tags.forEach(tag => {
            tags[tag] = true
          })
        }
      })
      res.json(Object.keys(tags).sort((a, b) => a.localeCompare(b)))
    }
  })
})

router.get('/:id', (req, res) => {
  Post.findOne({
    slug: req.params.id
  }).exec((err, post) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.json(post)
    }
  })
})

router.post('/', auth.admin, (req, res) => {
  const newPost = new Post(req.body)
  newPost.slug = slugify(newPost.title).toLowerCase()
  newPost.save((err, post) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(post)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body
  params.slug = slugify(params.title).toLowerCase()
  Post.findOneAndUpdate({
    slug: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, post) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(post)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Post.findOne({
    slug: req.params.id
  }).exec((err, post) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      post.remove()
      res.send(post)
    }
  })
})

module.exports = router
