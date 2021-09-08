const mongoose = require('mongoose')

const SettingsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  contact: String,
  email: String,
  url_facebook: String,
  url_youtube: String,
  url_twitter: String,
  url_instagram: String,
  logo: Object,
  favicon: Object,
  banners: [Object],
  postal_code: String
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema)
module.exports = Settings
