const mongoose = require('mongoose');
const { Schema } = mongoose;

const Implements = new Schema({
    serial:{type: String, required:true, unique: true},
    name:{type: String, required:true},
    register:({type: Date, default: Date.now()}),
    stock:({type: Number, required:true}),
    mark:({type: String, required:true}),
    description:({type: String, required:true})
})

Implements.index({serial: 1})

module.exports = global.Implements = mongoose.model('Implements', Implements);