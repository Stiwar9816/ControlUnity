const express = require('express')
const consola = require('consola')
const path = require('path');
// const methodOverride = require('method-override');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const api = require('./api/routes/index.js');
// const session = require('express-session');
const {
  Nuxt,
  Builder
} = require('nuxt')


const app = express()
app.use(morgan('dev'))

require('./db/database.js')
require('./api/config/passport.js')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host,
    port
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use('/api', api)
  app.use(nuxt.render)
  app.use(mongoSanitize())
  app.use(cors())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())
  // app.use(methodOverride('_method'))
  app.use(passport.initialize())
  app.use(passport.session())

// Static files
app.use(express.static(path.join(__dirname, '../static/')))

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()