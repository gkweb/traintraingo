const express = require('express')
const next = require('next')
const config = require('./../next.config.js')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, conf: config })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/departures/:stop_id', (req, res) => {
    return app.render(req, res, '/departures', {
      stop_id: parseInt(req.params.stop_id),
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
