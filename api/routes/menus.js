const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../config/auth')
const Menu = mongoose.model('Menu')

router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find({}).populate(req.query.populate).sort('name')
    res.json(menus)
  } catch (err) {
    res.status(422).send(err.message)
  }
})

function setMenuItem(menu) {
  return {
    _id: menu._id.toString(),
    name: menu.name,
    page: menu.page,
    url: menu.url || ''
  }
}

router.get('/submenus', async (req, res) => {
  try {
    // const menus = (await Menu.find({ menu: null }).populate('submenu').sort('name')).map(menu => {
    //   let menuItem = setMenuItem(menu)
    //   menuItem.submenus = menuItem.submenu ? [menuItem.submenu] : []
    //   return menuItem
    // })

    const menus = (await Menu.find({ menu: null })
      .populate(req.query.populate)
      .sort('name'))
      .map(menu => setMenuItem(menu))

    for (let i = 0; i < menus.length; i++) {
      const submenus = (await Menu.find({ menu: menus[i]._id })
        .populate(req.query.populate)
        .sort('name'))
        .map(menu => setMenuItem(menu))

      if (submenus) {
        menus[i].submenus = submenus
      }
    }

    res.json(menus)
  } catch (err) {
    res.status(422).json(err.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const menu = await Menu.findOne({ _id: req.params.id })
    res.json(menu)
  } catch (err) {
    res.status(422).send(err.message)
  }
})

router.post('/', auth.admin, (req, res) => {
  const newMenu = new Menu(req.body)
  newMenu.save((err, menu) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(menu)
    }
  })
})

router.put('/:id', auth.admin, (req, res) => {
  const params = req.body

  Menu.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: params
  }, {
    upsert: true
  }, (err, menu) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.send(menu)
    }
  })
})

router.delete('/:id', auth.admin, (req, res) => {
  Menu.findOne({
    _id: req.params.id
  }).exec((err, menu) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      menu.remove()
      res.send(menu)
    }
  })
})

module.exports = router
