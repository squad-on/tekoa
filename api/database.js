require('./models/Settings')
require('./models/User')
require('./models/Menu')
require('./models/Post')
require('./models/Page')
require('./models/Contact')
require('./models/Media')
require('./config/passport')

const mongoose = require('mongoose')
const isProduction = process.env.NODE_ENV === 'production'
const DATABASE_URI = 'mongodb://localhost:27017/' + process.env.APP_NAME

mongoose.set('useFindAndModify', false)

if (isProduction) {
  mongoose.set('debug', true)
  mongoose.connect(DATABASE_URI, {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
} else {
  mongoose.set('debug', true)
  mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
}
