const Room = require('../models/room.js');

module.exports = {

    // Get all Rooms
    allRoom: async (req, res, next) => {
        const Rooms = await Room.find({})
        res.status(200).json({Rooms: Rooms})
    },

    // Created new Room
    newRoom: async (req, res, next) => {
        const newRoom = new Room(req.body)
        const Room = await newRoom.save()
        res.status(200).json(Room)
    },

    // Get one Room from id
    getOneRoom: async (req, res, next) => {
        const id = req.params.id
        const Room = await Room.findById(id)
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
        const oldRoom = await Room.findByIdAndUpdate(RoomId, newRoom)
        res.status(200).json(oldRoom)
    },

    // Delete one Room from id
    deleteRoom: async (req, res, next) => {
        const RoomId = req.params.id
        await Room.findOneAndRemove(RoomId)
        res.status(204).json({
            success: true
        })
    }
}