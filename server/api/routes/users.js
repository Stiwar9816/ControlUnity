/* const express = require('express');
const router = express.Router() */
const UsersController = require('../controllers/users');

function users(router) {
    
    router.post('/register', UsersController.register)
    
    router.post('/login',UsersController.login)
    
    // router.route('/logout')
    //     .get(UsersController.logout)
    
    // router.route('/forgot')
    //     .get(UsersController.forgot)

}

module.exports = users