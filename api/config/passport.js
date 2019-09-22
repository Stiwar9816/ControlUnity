const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
 const user = await User.findById(id)
    done(null, user)
});

passport.use('local-register', new LocalStrategy({
  usernameField: 'cc',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, cc, password, done) => {
  const newUser = new User()
  newUser.cc = cc
  newUser.password = user.encryptPassword(password)
  await user.save()
  done(null, false, {message: 'Not User Found'})
}))


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
