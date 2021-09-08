const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const slugify = require('slugify')
const { admin } = require('../config/auth')
const Product = mongoose.model('Product')

router.get('/', admin, function(req, res) {
  const query = { deleted: { $ne: true } }
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' }
  }
  Product.find(query).populate('orders').exec(function(err, products) {
    if (err) {
      res.status(422).send(err)
    } else {
      res.json(products)
    }
  })
})

router.get('/current_tags', (req, res) => {
  const query = { deleted: { $ne: true } }
  Product.find(query).select('tags').exec((err, products) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      const tags = {}
      products.forEach(product => {
        if (product.tags) {
          product.tags.forEach(tag => {
            tags[tag] = true
          })
        }
      })
      res.json(Object.keys(tags).sort((a, b) => a.localeCompare(b)))
    }
  })
})

router.get('/:id', admin, function(req, res) {
  Product.findOne({
    $or: [
      { _id: req.params.id }, { slug: req.params.id }
    ]
  }).exec(function(err, product) {
    if (err) {
      res.status(422).send(err)
    } else {
      res.json(product)
    }
  })
})

router.post('/', admin, function(req, res) {
  const newProduct = new Product(req.body)
  newProduct.slug = slugify(newProduct.name).toLowerCase()
  newProduct.save(function(err, product) {
    if (err) {
      res.status(422).send('Ocorreu um erro ao salvar: ' + err.message)
    } else {
      res.send(product)
    }
  })
})

router.put('/:id', admin, function(req, res) {
  const params = req.body
  Product.findOneAndUpdate({
    $or: [
      { _id: req.params.id }, { slug: req.params.id }
    ]
  }, {
    $set: params
  }, {
    upsert: true
  }, function(err, product) {
    if (err) {
      res.status(422).send(err)
    } else {
      res.send(product)
    }
  })
})

router.delete('/:id', admin, function(req, res) {
  Product.findOne({
    $or: [
      { _id: req.params.id }, { slug: req.params.id }
    ]
  }).exec(function(err, product) {
    if (err) {
      res.status(422).send(err)
    } else {
      product.deleted = true
      product.save()
      res.send(product)
    }
  })
})

module.exports = router
