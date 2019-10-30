const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const mapDuplicate = require("../helpers/mapDuplicate");

const Users = new Schema(
  {
    cc: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      default: "recepcion",
      enum: ["recepcion", "tic", "planeacion"]
    },
    lastLogin: {
      type: Date
    }
  },
  { timestamps: true }
);
Users.post("save", mapDuplicate("Users"));

//En caso que se utilice Passport como metodo de autentificacion usando depencenia bcryptjs
Users.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

Users.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

Users.index({
  cc: 1
});

module.exports = global.Users = mongoose.model("Users", Users);
