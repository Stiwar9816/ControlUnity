const mongoose = require('mongoose');
const checkExpire = require('./checkExpire');
const cross = require('./cross');
const createBooking = require('./createBooking');

const {
  Schema
} = mongoose;

const Bookings = new Schema({
  cc: {
    type: String,
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
    type: Date
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
Bookings.statics.cross = cross;
Bookings.statics.createBooking = createBooking;
const model = global.Bookings = mongoose.models.Bookings || mongoose.model('Bookings', Bookings);

// model.createBooking({
//   cc: "11234456",
//   name: "Jhon Palacios",
//   event: "Fisica II",
//   room: "101",
//   implement: "UIB-VIDPRO001",
//   schedules: [{start: "2020-02-26T01:00:00.000Z", end: "2020-02-26T01:30:00.000Z"}]
// }
// ).then(result => {
// console.log({result})
// }).catch(err=>{
//   console.log({err})
// })

/*
model.cross(new Date("2020-02-22T13:30:03.095Z"), new Date("2020-02-22T16:00:03.095Z")).then(() => {
  console.log("do not cross dates");
})
.catch((error) => console.log({error}))
*/
// model.checkExpire(model).then(docs => console.log({docs})).catch(error => console.log({error}));
// Bookings.aggregate([
//     {"$match": {start: {$in:start},end: {$in:end}, room: {$in: room}}}
// ])
module.exports = model;