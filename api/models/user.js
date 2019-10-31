const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const bcrypt = require('bcrypt');
const mapDuplicate = require('../helpers/mapDuplicate')

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
    email: ({
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }),
    role: ({
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'suAdmin']
    }),
    password: ({
        type: String,
        required: true
    }),
    singUp: ({
        type: Date,
        default: Date.now
    }),
    lastLogin: ({
        type: Date,
        default: Date.now
    })
});
Users.post("save", mapDuplicate("Users"))

Users.pre('save', function (next) {
    bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(this.password, salt).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error))
    }).catch(error => next(error))
});



Users.index({
  cc: 1
});

module.exports = global.Users = mongoose.model("Users", Users);
