if (process.env.NODE_ENV !== 'production') {
  const ne = require('now-env')
} // Ensure now env is loaded locally

module.exports = {
  target: 'serverless',
  env: {
    API_URL: process.env.API_URL,
  },
}
