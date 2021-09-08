const router = require('express').Router()
const passport = require('passport')

router.post('/login', function(req, res, next) {
  if (!req.body.email) {
    return res.status(422).json('Email inválido')
  }

  if (!req.body.password) {
    return res.status(422).json('Senha inválida')
  }

  try {
    passport.authenticate('local', {
      session: true
    }, function(err, user, info) {
      if (err) {
        return res.status(500).json('Ocorreu um erro ao fazer a autenticação: ' + err)
      }

      if (user) {
        user.token = user.generateJWT()
        return res.json(user.toAuthJSON())
      } else {
        return res.status(422).json(info)
      }
    })(req, res)
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.post('/logout', function(req, res) {
  return res.json(true)
})

module.exports = router
