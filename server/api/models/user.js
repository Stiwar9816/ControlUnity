const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');
const mapDuplicate = require('../helpers/mapDuplicate')

const Users = new Schema({
    cc:{type: String, required:true, unique: true},
    name:{type: String, required:true},
    password:({type: String, required:true}),
    email:({type: String, required:true, lowercase:true}),
    date:({type: Date, default:Date.now}),
})
Users.post("save", mapDuplicate("Users"))

Users.methods.encryptPassword = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

Users.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

Users.index({cc: 1})

module.exports = global.Users = mongoose.model('Users', Users);