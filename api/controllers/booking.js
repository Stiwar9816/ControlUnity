const Booking = require('../models/Bookings');
const surePromise = require('../utils/surePromise');
const resolveResponse = require('../utils/resolveResponse');
// const Implements = require('../models/implements')

function mapStringToDate(time = "") {
  const result = createDate(new Date());
  const [hour, minute] = time.split(":");
  console.log({
    time,
    hour,
    minute
  });
  result.setHours(Number(hour));
  result.setMinutes(Number(minute));
  return result;
}

module.exports = {

  // Get all Bookings
  allBooking: async (req, res, next) => {
    const Bookings = await Booking.find({})
    res.status(200).json({
      Bookings: Bookings
    })
  },

  // Created new Booking
  newBooking: async (req, res, next) => {
   const {body = { }} = req
   const {ok, result, error} = await surePromise(Bookings.create(body))
   if(ok) return res.json(result)
   console.log({error})
   return resolveResponse({res,error}) 
    /*
    const cruce = await Booking.findOne({
        end: parse
    });
    console.log('Hola aqui esta el cruce ####' + cruce);
    if (cruce && room) {
        res.status(404).json({
            message: "Cruce de horarios"
        })
    } else {
        const newBooking = new Booking({
            cc,
            name,
            event,
            room,
            implement,
            date,
            start: mapStringToDate(start),
            end: mapStringToDate(end),
            received
        })
        const Bookings = await newBooking.save()
        res.status(200).json(Bookings)
        
    }
    */

    // newBookingImplements: async (req, res ,next) =>{
    //     const { id } = req.params 
    //     const newBooking = new Booking(req.body)
    //     const implements = await Implements.findById(id)
    //     newBooking.implements = implements
    //     await newBooking.save()
    //     booking.implements.push(newBooking);
    //     await booking.save()
    //     res.status(201).json(newBooking)
  },

  // Get one Booking from id
  getBooking: async (req, res, next) => {
    const {
      id
    } = req.params
    const booking = await Booking.findById(id)
    res.status(200).json(booking)
  },

  // replaceBooking: async (req, res, next)=>{
  //     const { BookingId } = req.params.id
  //     const newBooking = req.body
  //     const oldBooking =   await Booking.findByIdAndUpdate(BookingId, newBooking)
  //     res.status(200).json({success: true})
  // },

  // Update one Booking from id
  updateBooking: async (req, res, next) => {
    const BookingId = req.params.id
    const newBooking = req.body
    const oldBooking = await Booking.findByIdAndUpdate(BookingId, newBooking)
    res.status(200).json(oldBooking)
  },

  // Delete one Booking from id
  deleteBooking: async (req, res, next) => {
    const BookingId = req.params.id
    await Booking.findOneAndRemove(BookingId)
    res.status(204).json({
      success: true
    })
  },

  // Get data of rooms on booking
  /*  getBookingRoom : async (req, req, next) =>{
       const { id } = req.param.id
       const booking  =  await Booking.findById(id).populate('Rooms')
       res.status(200).json(booking)
   }, */

}