const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const bcrypt = require('bcrypt-nodejs');
const mapDuplicate = require('../helpers/mapDuplicate')

const Users = new Schema({
    cc: {
        type: String,
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

//Usando bcrypt-nodejs para haserar el password 
Users.pre('save', (next) => {
    let user = this
    // if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash 
            next()
        })
    })
})

//En caso que se utilice Passport como metodo de autentificacion usando depencenia bcryptjs
// Users.methods.encryptPassword = async (password)=> {
//     const salt = await bcrypt.genSalt(15)
//     const hash = bcrypt.hash(password, salt)
//     return hash
// }

// Users.methods.comparePassword = async function(password){
//     return await bcrypt.compare(password, this.password)
// }

Users.index({
    cc: 1
})

module.exports = global.Users = mongoose.model('Users', Users);