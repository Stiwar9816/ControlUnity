const mongoose = require('mongoose');
const { Schema } = mongoose;

const Mesh = new Schema({
    matter:({type: String, required:true}),
    idMetter:{type: String, required:true},
    dayClass: {type: String},
    teacher:({type: String}),
    semester:({type:String}),
    credits:({type:String}),
    hourStart:({type: String}),
    hourEnd:({type: String}),
    ht:({type: String}),
    hp:({type: String}),
    htp:({type: String}),
})


module.exports = global.Mesh = mongoose.models.Mesh || mongoose.model('Mesh', Mesh);