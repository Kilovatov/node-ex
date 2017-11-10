const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;


const data = [{
    'email': 'a@example.com',
    'username': 'aaa',
    'password': 'test123'
}];

const APP_ID = 'fifth-task';
const APP_SECRET = 'secret-secret';


passport.use(new LocalStrategy({
    username: 'username',
    password: 'password',
    session: false
}, function (username, password, done) {
    const user = data.filter(user => (username === user.username && password === user.password))[0];
    if (user) {
        done(null, user);
    } else {
        done(null, false, 'Bad username/password combination');
    }
}));

passport.use(new FacebookStrategy({
        clientID: APP_ID,
        clientSecret: APP_SECRET,
        callbackURL: "http://localhost:8080/api/products"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.use(new GoogleStrategy({
        clientID: APP_ID,
        clientSecret: APP_SECRET,
        callbackURL: "http://localhost:8080/api/products"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.use(new TwitterStrategy({
        consumerKey: APP_ID,
        consumerSecret: APP_SECRET,
        callbackURL: "http://localhost:8080/api/products"
    },
    function(token, tokenSecret, profile, cb) {
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));


module.exports = passport;