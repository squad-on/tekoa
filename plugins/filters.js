import Vue from 'vue'

const stripHtml = (html) => {
  return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : ''
}

Vue.filter('truncate', function(value, limit) {
  if (value && value.length > limit) {
    value = stripHtml(value).substring(0, (limit - 3)) + '...'
  }
  return value
})

Vue.filter('moeda', value => {
  return Vue.options.filters.currency(value, 'R$ ', 2, { decimalSeparator: ',', thousandsSeparator: '.' })
})

Vue.filter('filename', doc => {
  if (doc) {
    if (doc.title) {
      return doc.title
    } else {
      const docUrl = doc.url.split('/')
      return docUrl[docUrl.length - 1]
    }
  }
})
