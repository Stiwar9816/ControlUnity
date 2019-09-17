const router = require('express').Router();
const path = require('path')
// require('./users.js')(router);
// require('./boats.js')(router);
// require('./listUsers.js')(router);
const cors = require('cors');

router.use(cors({
  origin: 'http://localhost:3000'
}));

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../../../layouts/default.vue'))
});

module.exports = router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});
