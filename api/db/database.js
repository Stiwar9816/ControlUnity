const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb+srv://JhonE:pa55word123@cluster0-hstd5.mongodb.net/test?retryWrites=true&w=majority', {
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(db => console.log('db is connected'))
    .catch(error => console.log(error));