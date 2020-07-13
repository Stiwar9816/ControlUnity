const express = require("express");
const consola = require("consola");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
require('dotenv').config()
require("./utils");
const api = require("./routes");
// const authToken = require('./middleware/authToken.js')
// const { Nuxt, Builder } = require("nuxt");
// const auth = require("./config/auth");
// Start of aplication
const app = express();
require("./db/database.js");
// views stattus of methods
app.use(morgan("dev"));

//middlewares
app.use(mongoSanitize());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// app.use(authToken);
// Sessions to create req.session
app.use("/api", api);
// app.use(auth);

// Import and Set Nuxt.js options
// const config = require("../nuxt.config.js");
// config.dev = process.env.NODE_ENV !== "production";

// async function start() {

  
//   // Init Nuxt.js
// const nuxt = new Nuxt(config);



// const { host, port } = nuxt.options.server;

//   // Build only in dev mode
//   if (config.dev) {
//     const builder = new Builder(nuxt);
//     await builder.build();
//   } else {
//     await nuxt.ready();
//   }

//   // Give nuxt middleware to express
//   // Import API routes

// }
// app.use(nuxt.render);
// Static files
app.use(express.static(path.join(__dirname, "../static/")));

// Listen the server
app.listen(process.env.PORT || 4000);
consola.ready({
  message: `Server listening on ${process.env.HOTS || 'localhost'}:${process.env.PORT || '4000'}`,
  badge: true
});
// start();
// Export API from are reading for serverMiddleware
// module.exports = {
//   path: "/api",
//   handler: app
// };
