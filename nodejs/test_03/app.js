//npm modules
const express = require('express');
//const uuid = require('uuid/v4')
const session = require('express-session')
//const FileStore = require('session-file-store')(session);
//const bodyParser = require('body-parser');
const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
const DigestStrategy = require('passport-http').DigestStrategy;

const users = [
  {id: 1, username: 'user1', password: 'password1'},
  {id: 2, username: 'user2', password: 'password2'}
]

passport.use(new DigestStrategy(
    { qop: 'auth' },
    function(username, done) {
        var user = users.find(function (user) { return user.username === username; });
        console.log('dbg1');
        console.log(user);
        if (user) return done(null, user, user.password);
        else return done(null, false);
    }
));

passport.serializeUser(function(user, done) {
    console.log('dbg2');
    console.log(user);
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    console.log('dbg3');
    console.log(id);
    var user = users.find(function (user) { return user.id === id; });
    console.log(user);
    done(null, user);
});

const app = express();
app.use(session({secret: 'qwerty'}));
app.use(passport.initialize());
app.use(passport.session());

app.get(
    '/login',
    passport.authenticate('digest'),
    function (req, res) {
        res.send('Logged in\n');
    }    
)

app.listen(80);