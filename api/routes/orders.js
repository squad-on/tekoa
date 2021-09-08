const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { authenticated, admin } = require('../config/auth')
const Order = mongoose.model('Order')

router.get('/', authenticated, function(req, res) {
  const query = { }

  if (req.user.role === 'user') {
    query.user = req.user._id
  }

  Order.find(query)
    .populate({
      path: 'items.product',
      model: 'Product'
    })
    .sort({
      code: -1
    })
    .exec(function(err, orders) {
      if (err) {
        res.status(422).send(err)
      } else {
        res.json(orders)
      }
    })
})

router.get('/:id', authenticated, function(req, res) {
  const query = {
    _id: req.params.id
  }

  if (req.user.role === 'user') {
    query.user = req.user._id
  }

  Order.findOne(query)
    .populate([
      'user',
      {
        path: 'items.product',
        model: 'Product'
      }
    ])
    .exec(function(err, order) {
      if (err) {
        res.status(422).send(err)
      } else {
        res.json(order)
      }
    })
})

router.put('/:id', admin, function(req, res) {
  const query = {
    _id: req.params.id
  }

  Order.findOne(query).exec(function(err, order) {
    if (err) {
      res
        .status(422)
        .send(err)
    } else {
      const status = req.body.status
      if (status) {
        order.status = status
      }
      order.save().then(function() {
        res.json(order)
      })
    }
  })
})

module.exports = router
