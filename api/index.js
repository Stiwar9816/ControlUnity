const express = require("express");
const consola = require("consola");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const api = require("./routes");
<<<<<<< HEAD
const authToken = require('./middleware/authToken.js')
=======
>>>>>>> 1d500cc7c51c25b664fca6beb9bcd1617ab5236d
const { Nuxt, Builder } = require("nuxt");
// const auth = require("./config/auth");
// Start of aplication
const app = express();
require("./db/database.js");
// views stattus of methods
app.use(morgan("dev"));

//middlewares
// app.use(auth);
app.use(mongoSanitize());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
  );
  app.use(bodyParser.json());

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);
  app.use(authToken);
  // Import API routes
app.use('/api',api);
  // Static files
  app.use(express.static(path.join(__dirname, "../static/")));

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
// Export API from are reading for serverMiddleware
module.exports = {
  path: "/api",
  handler: app
};
