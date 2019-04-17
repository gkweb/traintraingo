if (process.env.NODE_ENV !== 'production') {
  const ne = require('now-env')
}

// Allows for intercepting configuration prod/dev environments
module.exports = {
  DEV_ID: process.env.DEV_ID || '',
  DEV_KEY: process.env.DEV_KEY || '',
  BASE_URL: process.env.API_BASE_URL || '',
  ORIGIN_URL: process.env.ORIGIN_URL || '',
  IS_DEBUG: process.env.GQL_DEBUG && process.env.GQL_DEBUG === 'true',
}
