const Booking = require('../models/booking.js');

module.exports = {

    // Get all Bookings
    allBooking: async (req, res, next) => {
        const Bookings = await Booking.find({})
        res.status(200).json(Bookings)
    },

    // Created new Booking
    newBooking: async (req, res, next) => {
        const newBooking = new Booking(req.body)
        const Booking = await newBooking.save()
        res.status(200).json(Booking)
    },

    // Get one Booking from id
    getOneBooking: async (req, res, next) => {
        const id = req.params.id
        const Booking = await Booking.findById(id)
        res.status(200).json(Booking)
    },

    // replaceBooking: async (req, res, next)=>{
    //     const { BookingId } = req.params.id
    //     const newBooking = req.body
    //     const oldBooking =   await Booking.findByIdAndUpdate(BookingId, newBooking)
    //     res.status(200).json({success: true})
    // },

    // Update one Booking from id
    updateBooking: async (req, res, next) => {
        const BookingId = req.params.id
        const newBooking = req.body
        const oldBooking = await Booking.findByIdAndUpdate(BookingId, newBooking)
        res.status(200).json(oldBooking)
    },

    // Delete one Booking from id
    deleteBooking: async (req, res, next) => {
        const BookingId = req.params.id
        await Booking.findOneAndRemove(BookingId)
        res.status(204).json({
            success: true
        })
    }
}