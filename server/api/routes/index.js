const router = require('express-promise-router')()
const path = require('path')
require('./users.js');
require('./implements.js');
// require('./listUsers.js')(router);
const cors = require('cors');

router.use(cors({
  origin: 'http://localhost:3000'
}));

// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '../../../layouts/default.vue'))
// });

module.exports = router
