const mongoose = require("mongoose");
const { Schema } = mongoose;

const Teachers = new Schema({
  cc: { type: String, required: true, unique: true },
  name: { type: String},
  email: { type: String, lowercase: true, required: true },
  observation:{type: String},
  status: ({type:String,  default: 'Activo', enum: ['Activo', 'Inactivo']})
});


module.exports = global.Teachers = mongoose.models.Teachers || mongoose.model("Teachers", Teachers);
