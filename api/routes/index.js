const router = require('express-promise-router')();
const {
    allImplement,
    newImplement,
    getOneImplement,
    // replaceImplement,
    updateImplement,
    deleteImplement
} = require('../controllers/implements')

router.get('/implements', allImplement)
router.get('/oneImplement/:id', getOneImplement)
router.post('/newImplement', newImplement)
router.put('/updateImplement/:id', updateImplement)
router.delete('/deleteImplement/:id',deleteImplement)

/* 
router.get('/oneImplent/:id/room', getBookingRoom)
router.post('/oneImplement/:id/room', newBookingRoom) */
module.exports = router
