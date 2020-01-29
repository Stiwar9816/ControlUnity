const mongoose = require('mongoose');
const { Schema } = mongoose;

const Bookings = new Schema({
    cc:{type: Number, required:true, unique: true},
    name:{type: String, required:true},
    event:({type: String, required:true}),
    room:{type: String, required:true},
    implement: {type: Array},
    date:({type: Array}),
    Hstart:({type:String}),
    Hend:({type:String}),
    received:({type: Date})
})


module.exports = global.Bookings = mongoose.models.Bookings || mongoose.model('Bookings', Bookings);