// Import dependencies driver of errors
const router = require('express-promise-router')();
const passport = require('passport');
const { isAuthenticated} = require('../helpers/auth')
// Import fucntions of operations crud
const controllersImplements = require('../controllers/implements')
const controllersUser = require('../controllers/users')
const controllersBookings = require('../controllers/booking')
const controllersRooms = require('../controllers/room')

// Routes Users crud and login
router.post('/register', controllersUser.register)
router.post('/login', passport.authenticate('local',{
    successRedirect: 'http://localhost:3000/home',
    failureRedirect: 'http://localhost:3000'
}))
router.get('/logout', isAuthenticated,controllersUser.logout)
// router.get('/forgot', controllersUser.forgot)
router.get('user', isAuthenticated,controllersUser.allUser)
router.get('user/:id', isAuthenticated,controllersUser.getOneUser)
router.put('updateUser/:id', isAuthenticated,controllersUser.updateUser)
router.delete('deleteUser/:id', isAuthenticated,controllersUser.deleteUser)

// Routes Bookings Crud
router.get('/booking', isAuthenticated,controllersBookings.allBooking)
router.get('/booking/:id', isAuthenticated,controllersBookings.getOneBooking)
router.post('/newBooking', isAuthenticated,controllersBookings.newBooking)
router.put('/updateBooking/:id', isAuthenticated,controllersBookings.updateBooking)
router.delete('/deleteBooking/:id', isAuthenticated,controllersBookings.deleteBooking)

// Routes Rooms Crud
router.get('/room', isAuthenticated,controllersRooms.allRoom)
router.get('/room/:id', isAuthenticated,controllersRooms.getOneRoom)
router.post('/newRoom', isAuthenticated,controllersRooms.newRoom)
router.put('/updateRoom/:id', isAuthenticated,controllersRooms.updateRoom)
router.delete('/deleteRoom/:id', isAuthenticated,controllersRooms.deleteRoom)

// Routes Implements Crud
router.get('/implement', isAuthenticated,controllersImplements.allImplement)
router.get('/implement/:id', isAuthenticated,controllersImplements.getOneImplement)
router.post('/newImplement', isAuthenticated,controllersImplements.newImplement)
router.put('/updateImplement/:id', isAuthenticated,controllersImplements.updateImplement)
router.delete('/deleteImplement/:id', isAuthenticated,controllersImplements.deleteImplement)

// Apliaction of populate from data
/* 
router.get('/oneImplent/:id/room', getBookingRoom)
router.post('/oneImplement/:id/room', newBookingRoom) */
module.exports = router
