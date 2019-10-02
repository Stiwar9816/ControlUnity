const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const bcrypt = require('bcryptjs');
const mapDuplicate = require('../helpers/mapDuplicate')
// SALT_WORK_FACTOR = 10;

const Users = new Schema({
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
    password: ({
        type: String,
        required: true,
        select: false
    }),
    lastLogin: ({
        type: Date
    }),
    date: ({
        type: Date,
        default: Date.now
    }),
})
Users.post("save", mapDuplicate("Users"))

// Users.pre('save', function(next){
//     // if (!user.isModified('password')) return next();

//     const user = this;

//     bcrypt.genSalt(10, function(err, salt){
//         if (err){ return next(err) }

//         bcrypt.hash(user.password, salt, null, function(err, hash){
//             if(err){return next(err)}

//             user.password = hash;
//             next();
//         })
//    })
// });

// Users.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };


//En caso que se utilice Passport como metodo de autentificacion usando depencenia bcryptjs
Users.methods.encryptPassword = async (password)=> {
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(password, salt)
    return hash
}

Users.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

Users.index({
    cc: 1
})

module.exports = global.Users = mongoose.model('Users', Users);