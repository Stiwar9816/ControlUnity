const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/controlUnity', {
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(db => console.log('db is connected'))
    .catch(error => console.log(error));