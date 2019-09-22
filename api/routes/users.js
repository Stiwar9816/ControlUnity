const { Router } = require('express')
const router = Router()
// const router = express.Router() */
// const passport = require('passport');
// const {
//     // register,
//     login
// } = require('../controllers/users');

// function users(router) {

// router.post('/register', register)
const users = [
    { name: 'Alexandre' },
    { name: 'Pooya' },
    { name: 'Sébastien' }
  ]

router.get('/login', (req, res, next)=>{
    res.json(users)
})

//     // router.route('/logout')
//     //     .get(UsersController.logout)

//     // router.route('/forgot')
//     //     .get(UsersController.forgot)

// }

module.exports = router