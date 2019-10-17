const Implement = require('../models/implements.js');

module.exports = {

    // Get all implements
    allImplement: async (req, res, next) => {
        const implements = await Implement.find({})
        res.status(200).json({implement:  implements})
    },

    // Created new implement
    newImplement: async (req, res, next) => {
        const newImplement = new Implement(req.body)
        const implement = await newImplement.save()
        res.status(200).json({implement: implement})
    },

    // Get one implement from id
    getOneImplement: async (req, res, next) => {
        const id = req.params.id
        const implement = await Implement.findById(id)
        res.status(200).json(implement)
    },

    // replaceImplement: async (req, res, next)=>{
    //     const { implementId } = req.params.id
    //     const newImplement = req.body
    //     const oldImplement =   await Implement.findByIdAndUpdate(implementId, newImplement)
    //     res.status(200).json({success: true})
    // },

    // Update one implement from id
    updateImplement: async (req, res, next) => {
        const implementId = req.params.id
        const newImplement = req.body
        const oldImplement = await Implement.findOneAndUpdate(implementId, newImplement)
        res.status(200).json(oldImplement)
    },

    // Delete one implement from id
    deleteImplement: async (req, res, next) => {
        const implementId = req.params.id
        await Implement.findOneAndDelete(implementId)
        res.status(204).json({
            success: true
        })
    },


    //Ref de Schemas
    /*   getBookingRoom : async (req, req, next) =>{
          const { id } = req.param.id
          const booking  =  await Booking.findById(id).populate('Rooms')
          res.status(200).json(booking)
      },

      newBookingRoom: async (req, res ,next) =>{
          const { id } = req.param.id
          const newBooking = new Booking(req.body)
          const room = await Room.findById(id)
          newBooking.romm = room
          await newBooking.save()
          booking.room.push(newBooking);
          await booking.save()
          res.status(201).json(newBooking)
      } */
}