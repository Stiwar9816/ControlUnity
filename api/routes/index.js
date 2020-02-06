// Import dependencies driver of errors and authenticated passport
const router = require('express-promise-router')();
const auth = require('../middleware/authToken.js')

// Import fucntions of operations crud
const controllersImplements = require('../controllers/implements')
const controllersUser = require('../controllers/users')
const controllersBookings = require('../controllers/booking')
const controllersRooms = require('../controllers/room')
const controllersMeshs = require('../controllers/mesh')
const controllersTeachers = require('../controllers/teacher')

// Routes Users crud and login
router.post('/register', controllersUser.register)
router.post('/login', controllersUser.login)
router.get('/logout', controllersUser.logout)
// router.get('/forgot', controllersUser.forgot)
router.get('/user', controllersUser.allUser)
router.get('/user/:id', controllersUser.getOneUser)
router.put('/updateUser/:id', controllersUser.updateUser)
router.delete('/deleteUser/:id',controllersUser.deleteUser)

// Routes Bookings Crud
router.get('/booking', controllersBookings.allBooking)
// router.get('/booking/:id', controllersBookings.getBookingImplements)
router.post('/newBooking', controllersBookings.newBooking)
router.put('/updateBooking/:id', controllersBookings.updateBooking)
router.delete('/deleteBooking/:id',controllersBookings.deleteBooking)
router.get('/booking/:id', controllersBookings.getBooking)

// Routes Rooms Crud
router.get('/room', controllersRooms.allRoom)
router.get('/room/:id', controllersRooms.getOneRoom)
router.post('/newRoom', controllersRooms.newRoom)
router.put('/updateRoom/:id', controllersRooms.updateRoom)
router.delete('/deleteRoom/:id', controllersRooms.deleteRoom)

// Routes Mesh Crud
router.get('/mesh', controllersMeshs.allMesh)
router.get('/mesh/:id', controllersMeshs.getOneMesh)
router.post('/newMesh', controllersMeshs.newMesh)
router.put('/updateMesh/:id', controllersMeshs.updateMesh)
router.delete('/deleteMesh/:id', controllersMeshs.deleteMesh)

// Routes Teachers Crud
router.get('/teacher', controllersTeachers.allTeacher)
router.get('/teacher/:id', controllersTeachers.getOneTeacher)
router.post('/newTeacher', controllersTeachers.newTeacher)
router.put('/updateTeacher/:id', controllersTeachers.updateTeacher)
router.delete('/deleteTeacher/:id', controllersTeachers.deleteTeacher)

// Routes Implements Crud
router.get('/implement', controllersImplements.allImplement)
router.get('/implement/:id', controllersImplements.getOneImplement)
router.post('/newImplement', controllersImplements.newImplement)
router.put('/updateImplement/:id', controllersImplements.updateImplement)
router.delete('/deleteImplement/:id', controllersImplements.deleteImplement)


module.exports = router;