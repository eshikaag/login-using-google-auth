const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.serializeUser(function(user, done) {

    console.log("serializing " + user.displayName);
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {

    console.log("deserializing " +user.email);
    done(null, user);
});

    passport.use(new GoogleStrategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL:process.env.CALLBACKURL,
        passReqToCallback:true
      },
      function(request, accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile);
        
      }
    ));