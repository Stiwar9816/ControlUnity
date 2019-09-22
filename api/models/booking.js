const mongoose = require('mongoose');
const { Schema } = mongoose;

const Bookings = new Schema({
    cc:{type: Number, required:true, unique: true},
    name:{type: String, required:true},
    event:({type: String, required:true}),
    timeIn:({type: Date, required:true}),
    timeOut:({type: Date, required:true}),
    room:{type: Schema.Types.ObjectId, ref:"Room"},
    implements:[{type: Schema.Types.ObjectId, ref:"Implements"}],
    capacity:({type: Number, required:true}),
    delivered:({type: Date}),
    received:({type: Date, required:true})
})

Bookings.index({cc: 1})

module.exports = global.Bookings = mongoose.model('Bookings', Bookings);