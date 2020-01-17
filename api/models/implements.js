const mongoose = require("mongoose");
const { Schema } = mongoose;

const Implements = new Schema(
  {
    serial: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mark: { type: String, required: true },
    type: { type: String, required: true },
    model: { type: String, required: true },
    location: { type: String, required: true },
    user: { type: String, required: true },
    description: { type: String, required: false },
    state: { type: String, required: true }
  },
  { timestamps: true }
);

// Implements.index({ serial: 1 });

module.exports = global.Implements = mongoose.models.Implements || mongoose.model("Implements", Implements);
