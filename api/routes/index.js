// Import dependencies driver of errors and authenticated passport
const router = require('express-promise-router')();
// const passport = require('passport');
const auth = require('../config/auth')
// const { isAuthenticated} = require('../helpers/auth')

// Import fucntions of operations crud
const controllersImplements = require('../controllers/implements')
const controllersUser = require('../controllers/users')
const controllersBookings = require('../controllers/booking')
const controllersRooms = require('../controllers/room')

// Routes Users crud and login
router.post('/register', controllersUser.register)
router.post('/login', controllersUser.login)
// router.post('/login', passport.authenticate('local',{
//     successRedirect: 'http://localhost:3000/home',
//     failureRedirect: 'http://localhost:3000'
// }))


router.get('/logout', auth, controllersUser.logout)
// router.get('/forgot', controllersUser.forgot)
router.get('/user', controllersUser.allUser)
router.get('/user/:id', controllersUser.getOneUser)
router.put('/updateUser/:id', controllersUser.updateUser)
router.delete('/deleteUser/:id', controllersUser.deleteUser)

// Routes Bookings Crud
router.get('/booking', controllersBookings.allBooking)
router.get('/booking/:id', controllersBookings.getOneBooking)
router.post('/newBooking', controllersBookings.newBooking)
router.put('/updateBooking/:id', controllersBookings.updateBooking)
router.delete('/deleteBooking/:id', auth, controllersBookings.deleteBooking)

// Routes Rooms Crud
router.get('/room', controllersRooms.allRoom)
router.get('/room/:id', controllersRooms.getOneRoom)
router.post('/newRoom', controllersRooms.newRoom)
router.put('/updateRoom/:id', controllersRooms.updateRoom)
router.delete('/deleteRoom/:id', controllersRooms.deleteRoom)

// Routes Implements Crud
router.get('/implement', controllersImplements.allImplement)
router.get('/implement/:id', controllersImplements.getOneImplement)
router.post('/newImplement', controllersImplements.newImplement)
router.put('/updateImplement/:id', controllersImplements.updateImplement)
router.delete('/deleteImplement/:id', controllersImplements.deleteImplement)

// Apliaction of populate from data
/* 
router.get('/oneImplent/:id/room', getBookingRoom)
router.post('/oneImplement/:id/room', newBookingRoom) */
module.exports = router;