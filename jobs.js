const Agenda = require('agenda');
const mongoConnectionString = 'mongodb://127.0.0.1/controlUnity';
// const checkExpire = require("./api/models/Bookings/checkExpire.js");
const mongoose = require('mongoose');

async function run() {
  // mongoose.set('debug', true);
  const db = await mongoose.connect('mongodb://localhost:27017/controlUnity', {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  const Bookings = require("./api/models/Bookings");
  const agenda = new Agenda().mongo(db.connection, 'jobs');
  
    agenda.define('check expired bookings', async function () {
      console.log("inicia");    
      Bookings.checkExpire(Bookings).then(docs => console.log({
        docs
      })).catch(error => console.log({
        error
      }));   
    });
  
  await agenda.start();
  await agenda.every('1 minutes', 'check expired bookings');
}

run();