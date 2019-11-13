const mongoose = require('mongoose');
const { Schema } = mongoose;

const Bookings = new Schema({
    cc:{type: Number, required:true},
    name:{type: String, required:true},
    event:({type: String, required:true}),
    room:{type: String, required:true},
    implement: {type: Array},
    date:({type: Date}),
    received:({type: Date})
})

Bookings.index({cc: 1})

module.exports = global.Bookings = mongoose.model('Bookings', Bookings);