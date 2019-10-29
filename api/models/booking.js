const mongoose = require('mongoose');
const { Schema } = mongoose;

const Bookings = new Schema({
    cc:{type: Number, required:true, unique: true},
    name:{type: String, required:true},
    event:({type: String, required:true}),
    // timeIn:({type: Date, required:true}),
    // timeOut:({type: Date, required:true}),
    // room:{type: Schema.Types.ObjectId, ref:"Rooms"},
    // implements:[{type: Schema.Types.ObjectId, ref:"Implements"}],
    capacity:{type: Number, required:true},
    room:{type: String, required:true},
    implement: {type: Array},
    date:({type: Date}),
    time:({type:Date}),
    received:({type: Date, default: Date.now})
})

Bookings.index({cc: 1})

module.exports = global.Bookings = mongoose.model('Bookings', Bookings);