const mongoose = require('mongoose');
const { Schema } = mongoose;

const Mesh = new Schema({
    matter:({type: String, required:true}),
    idMetter:{type: String, required:true},
    dayClass: {type: Array},
    teacher:({type: String}),
    semester:({type:Number}),
    credits:({type:Number}),
    hourStart:({type: String}),
    hourEnd:({type: String}),
    ht:({type: Number}),
    hp:({type: Number}),
    htp:({type: Number}),
})


module.exports = global.Mesh = mongoose.models.Mesh || mongoose.model('Mesh', Mesh);