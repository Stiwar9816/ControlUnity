const mongoose = require('mongoose');
const checkExpire = require('./checkExpire');
const {
  Schema
} = mongoose;

const Bookings = new Schema({
  cc: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  event: ({
    type: String,
    required: true
  }),
  room: {
    type: String,
    required: true
  },
  implement: {
    type: Array
  },
  date: {
    type: Array
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: createDate(new Date())
  },
  expired: {
    type: Boolean,
    default: false
  },
  schedules: [{
    end:{type:Date, required:true},
    start:{type:Date, required:true}
  }]
});

Bookings.statics.checkExpire = checkExpire;
const model = global.Bookings = mongoose.models.Bookings || mongoose.model('Bookings', Bookings);

// model.checkExpire(model).then(docs => console.log({docs})).catch(error => console.log({error}));
// Bookings.aggregate([
//     {"$match": {start: {$in:start},end: {$in:end}, room: {$in: room}}}
// ])
module.exports = model;