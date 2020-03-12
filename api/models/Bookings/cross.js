const validator = require('../../utils/validator')
const exceptions = require('../../utils/exceptions')


async function cross(start, end, room) {
    const isStartValidate = validator.validDate.validator(start)
    const isEndValidate = validator.validDate.validator(end)
    const isRoomValidate = validator.validText.validator(room)
    if (!isStartValidate) {
      return Promise.reject({...exceptions.INVALID_FIELD, details: 'start'})
    }
    if (!isEndValidate) {
      return Promise.reject({...exceptions.INVALID_FIELD, details: 'end'})
    }
    if(!isRoomValidate){
      return Promise.reject({...exceptions.INVALID_FIELD, details:'room'})
    }

  return Bookings.aggregate([{
      "$match":{
        "$and":[
          {
            "room": { "$eq": room }
          },
          {
            "schedules.start": { "$gte": new Date(start) }
         },
         {
             "schedules.end": { "$lte": new Date(end) }
         }
        ]
      }
    }]).count("count").then((result) => {
      if (result.length === 0) return Promise.resolve(true);
      const [{ count }] = result;
      const isCross = count > 0;
      if (isCross) return Promise.reject({...exceptions.DATE_CROSS}) 
    }).catch((error) => Promise.reject(error))

}

  
module.exports = cross;