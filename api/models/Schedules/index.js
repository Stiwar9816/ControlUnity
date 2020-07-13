const mongoose = require('mongoose');
const {Schema} = mongoose;

const Schedules = new Schema({
    end:{type:Date, required:true},
    start:{type:Date, required:true},
    belongsTo:{type: Schema.Types.ObjectId, ref:"Bookings"}
})

const model= global.Schedules = mongoose.models.Schedules || mongoose.model('Schedules', Schedules);

module.exports= model;