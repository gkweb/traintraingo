const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const fs = require('fs')
const path = require('path')

app.prepare().then(() => {
  const server = express()

  server.use((req, res, next) => {
    // now I can access this module inside the getInitialProps function
    req.fs = fs
    req.fsPath = path
    return next()
  })

  server.get('/departures/:stop_id', (req, res) => {
    console.log(req.params.stop_id)
    return app.render(req, res, '/departures', { stop_id: req.params.stop_id })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
