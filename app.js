require('dotenv').config()
const express = require('express')
const app = express()
const passport = require('passport');
const cookieSession = require('cookie-session')
let cookie_parser=require('cookie-parser')

require('./passport-setup');

//TypeError: Cannot read property 'given_name' of undefined
app.use(cookie_parser('7'))

app.use(cookieSession({
    name: 'login-session',
    keys: ['key1', 'key2']
  }))
  //passport.js passport.initialize() middleware not in use
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine","ejs")
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
 
    res.redirect('/success');
  }
);
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

app.get('/success',isLoggedIn, (req, res) =>{
    res.render("pages/profile",{name:req.user.given_name,last_name:req.user.family_name,pic:req.user.photos[0].value,email:req.user.emails[0].value})
});
app.get("/",(req,res)=>
{
    res.render("pages/index");
})
app.listen(5000, () => console.log(` App listening on port ${5000}!`))
