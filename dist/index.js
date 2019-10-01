
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dog-scraper-core.cjs.production.min.js')
} else {
  module.exports = require('./dog-scraper-core.cjs.development.js')
}
