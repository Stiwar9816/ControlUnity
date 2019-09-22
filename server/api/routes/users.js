const router = require('express-promise-router')();
// const router = express.Router() */
// const passport = require('passport');
const {
    // register,
    login
} = require('../controllers/users');

// function users(router) {

// router.post('/register', register)

router.get('/login', (req, res, next)=>{
    res.json({success: true})
})

//     // router.route('/logout')
//     //     .get(UsersController.logout)

//     // router.route('/forgot')
//     //     .get(UsersController.forgot)

// }

// module.exports = users