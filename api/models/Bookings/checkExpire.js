const {
  createDate
} = require("../../utils");

async function checkExpire(Bookings) {
  console.log("entra");
  return Bookings.where({
      "schedules.end": {
        $lt: new Date()
      }
    })
    .update({expire: true})
}

module.exports = checkExpire;