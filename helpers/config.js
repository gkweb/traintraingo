path = require('path')

require('dotenv').config()

// Allows for intercepting configuration prod/dev environments
module.exports = {
  API_URL: (process.env.API_URL || 'http://localhost:3000/')
}
