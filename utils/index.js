module.exports = {
  optionText(value, dataSource) {
    let text = null
    try {
      if (value && dataSource) {
        const options = require('../data/' + dataSource + '.json')
        const option = options.find(r => r.value === value)
        if (option) {
          text = option.text
        }
      }
    } catch {}
    return text
  }
}
