const mongoose = require("mongoose");
const { Schema } = mongoose;

const Rooms = new Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  description: { type: String}
});


module.exports = global.Rooms = mongoose.models.Rooms || mongoose.model("Rooms", Rooms);
