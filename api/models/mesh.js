const mongoose = require('mongoose');
const { Schema } = mongoose;

const Mesh = new Schema({
    matter:({type: String, required:true}),
    idMetter:{type: String, required:true},
    dayClass: {type: Array},
    teacher:({type: String}),
    semester:({type:Number}),
    hourStart:({type: String}),
    hourEnd:({type: String}),
    career:({type: Array}),
    room:({type:String})
})


module.exports = global.Mesh = mongoose.models.Mesh || mongoose.model('Mesh', Mesh);