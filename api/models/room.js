const mongoose = require('mongoose');
const { Schema } = mongoose;

const Rooms = new Schema({
    name:{type: String, required:true},
    description:{type: String, required:true, unique: true}
})

Rooms.index({name: 1})

module.exports = global.Rooms = mongoose.model('Rooms', Rooms);