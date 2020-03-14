const validator = require('../../utils/validator');
const exceptions = require('../../utils/exceptions')
const surePromise = require('../../utils/surePromise');
// const Bookings = require('./index')

async function createBooking(data = {}) {
  const { schedules = [],cc,name,event,room, implement = []} = data;
  const isCcValidate = validator.validCC.validator(cc)
  const isNameValidate = validator.validName.validator(name)
  const isEventValidate = validator.validText.validator(event)  
  // const isImplementValidate = validator.validText.validator(implement)
  const isRoomValidate = validator.validText.validator(room)
  
  if(!isCcValidate){
    return Promise.reject({...exceptions.INVALID_FIELD, details:'cc'})
  }
  debugger
  if(!isNameValidate){
    return Promise.reject({...exceptions.INVALID_FIELD, details:'name'})
  }
  debugger
  if(!isEventValidate){
    return Promise.reject({...exceptions.INVALID_FIELD, details:'event'})
  }
  debugger
  if(!isRoomValidate){
    return Promise.reject({...exceptions.INVALID_FIELD, details:'room'})
  }
  debugger
  if(!Array.isArray(implement)){
    return Promise.reject({...exceptions.INVALID_FIELD, details:'implement'})
  }
  // debugger

  if (!Array.isArray(schedules)) {
    return Promise.reject({...exceptions.INVALID_TYPE, details: 'schedules'})
  }
  debugger
  if (!schedules.length) {
    return Promise.reject({...exceptions.INVALID_FIELD, details:'length schedules'})
  }
  debugger
  const [{ start, end }] = schedules;
  const { ok, error } = await surePromise(Bookings.cross(start, end, room));
  if (ok) {
    const doc = new Bookings(data);  
    const result = await doc.save();
    return Promise.resolve(result);
  }
  return Promise.reject(error);
}

module.exports = createBooking;