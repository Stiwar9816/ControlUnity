const Booking = require('../models/booking.js');
const Implements = require('../models/implements')

module.exports = {

    // Get all Bookings
    allBooking: async (req, res, next) => {
        const Bookings = await Booking.find({})
        res.status(200).json({Bookings: Bookings})
    },

    // Created new Booking
    // newBooking: async (req, res, next) => {
    //     const newBooking = new Booking(req.body)
    //     const Bookings = await newBooking.save()
    //     res.status(200).json(Bookings)
    newBookingImplements: async (req, res ,next) =>{
        const { id } = req.params 
        const newBooking = new Booking(req.body)
        const implements = await Implements.findById(id)
        newBooking.implements = implements
        await newBooking.save()
        booking.implements.push(newBooking);
        await booking.save()
        res.status(201).json(newBooking)
    },

    // Get one Booking from id
    getBookingImplements : async (req, res, next) =>{
        const {id}  = req.params
        const booking  =  await Booking.findById(id).populate('Implements')
        res.status(200).json(booking)
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
        await Booking.findByIdAndRemove(BookingId)
        res.status(204).json({
            success: true
        })
    },

    // Get data of rooms on booking
   /*  getBookingRoom : async (req, req, next) =>{
        const { id } = req.param.id
        const booking  =  await Booking.findById(id).populate('Rooms')
        res.status(200).json(booking)
    }, */

    // Created new booking with data booking and room
    // newBookingRoom: async (req, res ,next) =>{
    //     const { id } = req.param.id
    //     const newBooking = new Booking(req.body)
    //     const room = await Room.findById(id)
    //     newBooking.romm = room
    //     await newBooking.save()
    //     booking.room.push(newBooking);
    //     await booking.save()
    //     res.status(201).json(newBooking)
    // }
}