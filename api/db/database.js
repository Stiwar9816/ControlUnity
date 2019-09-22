const mongoose = require('mongoose');

mongoose.set('useFindAndModifify', false)
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost:27017/controlUnity', {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(db => console.log('db is connected'))
    .catch(error => console.log(error))