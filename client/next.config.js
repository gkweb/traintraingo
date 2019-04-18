if (process.env.NODE_ENV !== 'production') {
  const ne = require('now-env')
  console.log('process.env.API_URL:')
  console.log(process.env.API_URL)
}

let conf = {
  target: 'serverless',
  env: {
    API_URL: process.env.API_URL || nowConf.env.API_URL,
  },
}

console.log('Launching with next config:')
console.log(conf)

module.exports = conf
