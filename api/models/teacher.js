const mongoose = require("mongoose");
const { Schema } = mongoose;

const Teachers = new Schema({
  cc: { type: String, required: true, unique: true },
  name: { type: String},
  email: { type: String, lowercase: true, required: true },
  lessons: { type: Array},
  status: ({type:String,  default: 'activo', enum: ['activo', 'inactivo']})
});

Teachers.index({ cc: 1 });

module.exports = global.Teachers = mongoose.model("Teachers", Teachers);
