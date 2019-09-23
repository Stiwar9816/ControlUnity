const express = require('express')
const consola = require('consola')
const path = require('path');
const methodOverride = require('method-override');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const api = require('./routes');
const session = require('express-session');
const {
  Nuxt,
  Builder
} = require('nuxt')

// Start of aplication
const app = express()
require('./db/database.js')
require('./config/passport')
// views stattus of methods
app.use(morgan('dev'))

//middlewares
app.use(mongoSanitize())
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(session({
  secret: 'MySecretSesion',
  resave: false,
  saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())

// Import API routes
app.use(api)
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
  app.use(nuxt.render)

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
// Export API from are reading for serverMiddleware
module.exports = {
  path: '/api',
  handler: app
}