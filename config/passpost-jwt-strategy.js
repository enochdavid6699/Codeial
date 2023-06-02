const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtraxtJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtraxtJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts , function(jwtPayLoad , done){
    
    User.findById(jwtPayLoad._id), function(err , user){
        if(err){console.lof(err); return;}

        if(user){
            return done(null , user);
        }else{
            return done(null , false);
        }
    }
}))

// passport.use(new JWTStrategy(opts, async function (jwtPayLoad, done) {
//     try {
//       const user = await User.findById(jwtPayLoad._id);
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     } catch (err) {
//       console.log(err);
//       return done(err);
//     }
//   }));
  

module.exports = passport;