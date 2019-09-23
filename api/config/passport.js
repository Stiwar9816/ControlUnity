const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')


passport.use( new LocalStrategy({
  usernameField: 'cc',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, cc, password, done) => {
  const user = await User.find({cc:cc})
  if (!user) {
        return done(null, false, { message: 'Not User found.' });
      } else {
        // Compare Password's User 
        const compare = await user.comparePassword(password);
        if(compare) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect Password.' });
        }
      }
      // const newUser = new User()
      // newUser.cc = cc
      // newUser.password = user.encryptPassword(password)
      // await user.save()
      // done(null, false, {message: 'Not User Found'})
    }))
    
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    
    passport.deserializeUser(async(id, done) => {
     const user = await User.findById(id)
        done(null, user)
    });

//   // Match cc's User
//   const user = await Users.findOne({cc});
//   if (!user) {
//     return done(null, false, { message: 'Not User found.' });
//   } else {
//     // Match Password's User 
//     const match = await user.matchPassword(password);
//     if(match) {
//       return done(null, user);
//     } else {
//       return done(null, false, { message: 'Incorrect Password.' });
//     }
//   }

// }));
// passport.deserializeUser(async(id, done) => {
// User.findById(id, (err, user)=>{
  //      done(err, user)
// })
//  });