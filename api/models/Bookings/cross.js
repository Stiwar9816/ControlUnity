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
      const [{ count }] = result;
      console.log("Promesa: ", result)
      console.log("Cuantos hay: ", count)
      debugger
      if (isCross = count === "null" || "undefined"){
        return Promise.resolve(true);
      }else{
        const isCross = count > 0;
        console.log("Valor se count es mayor que cero:", isCross)
        debugger
        return Promise.reject({...exceptions.DATE_CROSS}) 
      }
      
    }).catch((error) => Promise.reject(error))

}

  
module.exports = cross;