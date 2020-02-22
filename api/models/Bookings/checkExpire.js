const {
  createDate
} = require("../../utils");

async function checkExpire(Bookings) {
  return Bookings.where({
      "schedules.end": {
        $lt: new Date()
      }
    })
    .update({expire: true})
}

module.exports = checkExpire;