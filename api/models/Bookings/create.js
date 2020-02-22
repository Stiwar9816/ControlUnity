const validator = require('../../utils/validator');
const exceptions = require('../../utils/exceptions')
const surePromise = require('../../utils/surePromise');

async function create(data = {}) {
  const { schedules = [],cc,name,event,room,implement, } = data;
  const isCcValidate = validator.validCC.validator(cc)
  const isNameValidate = validator.validName.validator(name)
  const isEventValidate = validator.validText.validator(event)
  const isRoomValidate = validator.validText.validator(room)
  const isImplementValidate = validator.validText.validator(implement)
  
  if(!isCcValidate){
    return Promise.reject({...exceptions.INVALID_FIELD, details:'cc'})
  }
  if(!isNameValidate){
    return Promise.reject({...exceptions.INVALID_FIELD, details:'name'})
  }
  if(!isEventValidate){
    return Promise.reject({...exceptions.INVALID_FIELD, details:'event'})
  }
  if(!isRoomValidate){
    return Promise.reject({...exceptions.INVALID_FIELD, details:'room'})
  }
  if(!isImplementValidate){
    return Promise.reject({...exceptions.INVALID_FIELD, details:'implement'})
  }

  if (!Array.isArray(schedules)) {
    return Promise.reject({...exceptions.INVALID_TYPE, details: 'schedules'})
  }
  if (!schedules.length) {
    return Promise.reject({...exceptions.INVALID_FIELD, details:'length schedules'})
  }
  const [{ start, end }] = schedules;
  const { ok, error } = await surePromise(Bookings.cross(start, end, room));
  if (ok) {
    const doc = new Bookings(data);
    const result = await doc.save();
    return Promise.resolve(result);
  }
  return Promise.reject(error);
}

module.exports = create;