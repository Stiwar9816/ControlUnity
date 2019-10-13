const Rooms = require('../models/room.js');

module.exports = {

    // Get all Rooms
    allRoom: async (req, res, next) => {
        const Room = await Rooms.find({})
        res.status(200).json({Rooms: Room})
    },

    // Created new Room
    newRoom: async (req, res, next) => {
        const newRoom = new Rooms(req.body)
        const Room = await newRoom.save()
        res.status(200).json({Room: Room})
    },

    // Get one Room from id
    getOneRoom: async (req, res, next) => {
        const id = req.params.id
        const Room = await Rooms.findById(id)
        res.status(200).json(Room)
    },

    // replaceRoom: async (req, res, next)=>{
    //     const { RoomId } = req.params.id
    //     const newRoom = req.body
    //     const oldRoom =   await Room.findByIdAndUpdate(RoomId, newRoom)
    //     res.status(200).json({success: true})
    // },

    // Update one Room from id
    updateRoom: async (req, res, next) => {
        const RoomId = req.params.id
        const newRoom = req.body
        const oldRoom = await Rooms.findByIdAndUpdate(RoomId, newRoom)
        res.status(200).json(oldRoom)
    },

    // Delete one Room from id
    deleteRoom: async (req, res, next) => {
        const RoomId = req.params.id
        await Rooms.findOneAndDelete(RoomId)
        res.status(204).json({
            success: true
        })
    }
}